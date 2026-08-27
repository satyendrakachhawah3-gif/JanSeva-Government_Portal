const GovernmentScheme = require('../models/GovernmentScheme');

/**
 * AI Scheme Recommendation Engine
 * Computes exact match score based on official criteria & citizen demographics.
 */
const recommendSchemesForProfile = async (profileData) => {
  try {
    const schemes = await GovernmentScheme.find({ status: 'PUBLISHED' }).lean();

    const results = schemes.map((scheme) => {
      const crit = scheme.eligibilityCriteria || {};
      let matchScore = 100;
      const matchReasons = [];
      const caveats = [];

      // 1. Income Check
      if (profileData.annualIncome !== undefined) {
        if (profileData.annualIncome <= crit.maxIncome) {
          matchReasons.push(`Your annual income (₹${Number(profileData.annualIncome).toLocaleString('en-IN')}) is within the scheme ceiling limit of ₹${Number(crit.maxIncome).toLocaleString('en-IN')}.`);
        } else {
          matchScore -= 40;
          caveats.push(`Your reported income exceeds the maximum threshold limit of ₹${Number(crit.maxIncome).toLocaleString('en-IN')}.`);
        }
      }

      // 2. Age Check
      if (profileData.age !== undefined && profileData.age > 0) {
        if (profileData.age >= crit.minAge && profileData.age <= crit.maxAge) {
          matchReasons.push(`Your age (${profileData.age} yrs) satisfies the required range of ${crit.minAge} to ${crit.maxAge} yrs.`);
        } else {
          matchScore -= 30;
          caveats.push(`Your age is outside the specified criteria (${crit.minAge}-${crit.maxAge} yrs).`);
        }
      }

      // 3. Special Statuses (Student, Farmer, Disability, Female, Senior)
      if (crit.studentOnly) {
        if (profileData.isStudent) {
          matchReasons.push('You are an active student, matching the beneficiary target.');
        } else {
          matchScore -= 35;
          caveats.push('This scheme is exclusively reserved for enrolled students.');
        }
      }

      if (crit.farmerOnly) {
        if (profileData.isFarmer) {
          matchReasons.push('You qualify under the agricultural worker/farmer profile category.');
        } else {
          matchScore -= 35;
          caveats.push('This scheme is designed specifically for registered farmers.');
        }
      }

      if (crit.disabilityOnly) {
        if (profileData.isDisability) {
          matchReasons.push('You hold disability welfare qualification.');
        } else {
          matchScore -= 40;
          caveats.push('This scheme is dedicated to persons with disabilities (Divyangjan).');
        }
      }

      if (crit.femaleOnly) {
        if (profileData.gender === 'Female' || profileData.isWomanApplicant) {
          matchReasons.push('You meet the female beneficiary criterion.');
        } else {
          matchScore -= 45;
          caveats.push('This scheme is exclusively for women applicants.');
        }
      }

      if (crit.seniorOnly) {
        if (profileData.age >= 60 || profileData.isSeniorCitizen) {
          matchReasons.push('You meet the senior citizen (60+ years) eligibility criteria.');
        } else {
          matchScore -= 35;
          caveats.push('This scheme is targeted at senior citizens.');
        }
      }

      // 4. State Alignment
      if (profileData.state && scheme.state !== 'All India') {
        if (scheme.state.toLowerCase() === profileData.state.toLowerCase()) {
          matchReasons.push(`Scheme applies directly to your resident state (${profileData.state}).`);
        } else {
          matchScore -= 25;
          caveats.push(`Scheme is specific to ${scheme.state}, whereas your profile specifies ${profileData.state}.`);
        }
      } else {
        matchReasons.push('Available for citizens across all States & Union Territories of India.');
      }

      // 5. Occupation check
      if (crit.allowedOccupations && crit.allowedOccupations.length > 0 && profileData.occupation) {
        const matchesOcc = crit.allowedOccupations.some(
          occ => occ.toLowerCase() === profileData.occupation.toLowerCase() || occ === 'All'
        );
        if (matchesOcc) {
          matchReasons.push(`Your occupation (${profileData.occupation}) aligns with listed target beneficiaries.`);
        }
      }

      // Normalize score between 10% and 98%
      const finalScore = Math.max(10, Math.min(98, matchScore));
      let eligibilityStatus = 'Potentially Eligible';

      if (finalScore >= 75) {
        eligibilityStatus = 'Potentially Eligible';
      } else if (finalScore >= 45) {
        eligibilityStatus = 'Requires Further Verification';
      } else {
        eligibilityStatus = 'Criteria Not Matching';
      }

      return {
        scheme,
        matchPercentage: finalScore,
        eligibilityStatus,
        whyYouQualify: matchReasons,
        caveats,
        requiredDocuments: scheme.requiredDocuments || [],
        disclaimer: "Eligibility score is an AI estimate based on provided criteria. Official confirmation is done during document verification."
      };
    });

    // Sort by highest match score
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);
    return results;
  } catch (error) {
    console.error('[RecommendationEngine] Error:', error);
    throw error;
  }
};

module.exports = {
  recommendSchemesForProfile
};
