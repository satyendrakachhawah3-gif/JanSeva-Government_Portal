const GovernmentScheme = require('../models/GovernmentScheme');
const { computeTermVector, calculateCosineSimilarity } = require('./embeddingService');

/**
 * Retrieval Service for RAG Architecture
 * Retrieves relevant scheme knowledge chunks based on query similarity.
 */
const retrieveRelevantSchemes = async (queryText, limit = 4) => {
  try {
    const schemes = await GovernmentScheme.find({ status: 'PUBLISHED' }).lean();
    if (!schemes || schemes.length === 0) return [];

    const queryVec = computeTermVector(queryText);

    const scoredSchemes = schemes.map((scheme) => {
      const schemeText = `${scheme.name} ${scheme.department} ${scheme.category} ${scheme.description} ${scheme.targetBeneficiaries} ${(scheme.benefits || []).join(' ')} ${(scheme.requiredDocuments || []).join(' ')}`;
      const schemeVec = computeTermVector(schemeText);
      const similarity = calculateCosineSimilarity(queryVec, schemeVec);

      return {
        scheme,
        similarity
      };
    });

    // Sort by similarity descending
    scoredSchemes.sort((a, b) => b.similarity - a.similarity);

    // Return top matching schemes
    return scoredSchemes.slice(0, limit).map(item => item.scheme);
  } catch (error) {
    console.error('[RetrievalService] Error retrieving schemes:', error);
    return [];
  }
};

module.exports = {
  retrieveRelevantSchemes
};
