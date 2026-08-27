const { retrieveRelevantSchemes } = require('./retrievalService');

/**
 * AI Assistant & Generation Service
 * RAG-powered JanSeva Assistant answering citizen inquiries.
 */
const generateAssistantResponse = async (userQuery, conversationHistory = []) => {
  try {
    // Step 1: RAG Retrieval from Scheme Knowledge Base
    const relevantSchemes = await retrieveRelevantSchemes(userQuery, 3);

    // Step 2: Formulate Context-Rich System Prompt / Logic
    const queryLower = userQuery.toLowerCase();

    let answerText = '';
    const sources = [];

    if (relevantSchemes.length > 0) {
      const primaryScheme = relevantSchemes[0];
      sources.push({
        name: primaryScheme.name,
        department: primaryScheme.department,
        officialUrl: primaryScheme.officialUrl
      });

      if (queryLower.includes('document') || queryLower.includes('proof') || queryLower.includes('certificate')) {
        answerText = `Here are the official document requirements for **${primaryScheme.name}** under the **${primaryScheme.department}**:\n\n` +
          `• **Required Documents:**\n` +
          primaryScheme.requiredDocuments.map(doc => `  - ${doc}`).join('\n') +
          `\n\n• **Application Process:**\n` +
          primaryScheme.applicationProcess.map((step, idx) => `  ${idx + 1}. ${step}`).join('\n') +
          `\n\n📌 *Official Scheme Link:* [${primaryScheme.officialUrl}](${primaryScheme.officialUrl})`;
      } else if (queryLower.includes('eligib') || queryLower.includes('who can') || queryLower.includes('qualify')) {
        const crit = primaryScheme.eligibilityCriteria || {};
        answerText = `Below is the official eligibility summary for **${primaryScheme.name}**:\n\n` +
          `• **Target Beneficiaries:** ${primaryScheme.targetBeneficiaries}\n` +
          `• **Max Family Income Limit:** ₹${(crit.maxIncome || 0).toLocaleString('en-IN')}/year\n` +
          `• **Age Criteria:** ${crit.minAge || 18} to ${crit.maxAge || 70} years\n` +
          `• **State Scope:** ${primaryScheme.state}\n` +
          (crit.studentOnly ? `• **Student Requirement:** Applicants must be currently enrolled students.\n` : '') +
          (crit.farmerOnly ? `• **Farmer Requirement:** Applicants must hold agricultural land or PM-Kisan registry.\n` : '') +
          `\n📌 *Official Source:* Verify complete rules on the official portal at [${primaryScheme.officialUrl}](${primaryScheme.officialUrl}).`;
      } else {
        answerText = `Based on your request, here is key information regarding **${primaryScheme.name}**:\n\n` +
          `**Description:** ${primaryScheme.description}\n\n` +
          `**Key Benefits:**\n` +
          primaryScheme.benefits.map(b => `• ${b}`).join('\n') +
          `\n\n**How to Apply:**\n` +
          primaryScheme.applicationProcess.map((step, idx) => `${idx + 1}. ${step}`).join('\n') +
          `\n\nOther related schemes include: ` +
          relevantSchemes.slice(1).map(s => s.name).join(', ');
      }
    } else {
      answerText = `Thank you for reaching out to **JanSeva AI Assistant**. I couldn't find a direct scheme matching "${userQuery}" in our immediate active index.\n\n` +
        `Here are quick steps you can take on JanSeva AI:\n` +
        `1. Use the **Find Schemes For Me** tool on your dashboard to run an automated profile scan.\n` +
        `2. Browse our complete directory under **Government Schemes** with filters for Education, Agriculture, Healthcare, and Housing.\n` +
        `3. Check the **Service Locator** map to find your nearest Citizen Facilitation Center.`;
    }

    const disclaimer = "AI recommendations and answers are informational. Please verify official guidelines and application details with the respective government department before submission.";

    return {
      query: userQuery,
      answer: answerText,
      sources,
      disclaimer,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('[AIService] Error generating response:', error);
    return {
      query: userQuery,
      answer: "I apologize, but I encountered a temporary issue retrieving government scheme data. Please try searching directly in the Schemes section.",
      sources: [],
      disclaimer: "AI recommendations are informational. Please verify eligibility with official government sources.",
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = {
  generateAssistantResponse
};
