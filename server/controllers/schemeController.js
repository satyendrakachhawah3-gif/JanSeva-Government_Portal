const GovernmentScheme = require('../models/GovernmentScheme');
const SavedScheme = require('../models/SavedScheme');
const CitizenProfile = require('../models/CitizenProfile');
const { recommendSchemesForProfile } = require('../services/schemeRecommendationService');

// Get all schemes with search & filters
const getSchemes = async (req, res, next) => {
  try {
    const { search, category, state, department, minIncome, maxAge, beneficiaryType, status } = req.query;

    const filter = {};
    filter.status = status || 'PUBLISHED';

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (state && state !== 'All States') {
      filter.$or = [{ state: state }, { state: 'All India' }];
    }

    if (department && department !== 'All') {
      filter.department = department;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    const schemes = await GovernmentScheme.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: schemes.length,
      schemes
    });
  } catch (error) {
    next(error);
  }
};

// Get single scheme by ID
const getSchemeById = async (req, res, next) => {
  try {
    const scheme = await GovernmentScheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Government Scheme not found.' });
    }
    res.json({ success: true, scheme });
  } catch (error) {
    next(error);
  }
};

// Create new scheme (Admin)
const createScheme = async (req, res, next) => {
  try {
    const schemeData = { ...req.body, createdBy: req.user.id };
    const scheme = await GovernmentScheme.create(schemeData);
    res.status(201).json({ success: true, message: 'Scheme published successfully.', scheme });
  } catch (error) {
    next(error);
  }
};

// Update scheme (Admin)
const updateScheme = async (req, res, next) => {
  try {
    const scheme = await GovernmentScheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found.' });
    }
    res.json({ success: true, message: 'Scheme updated successfully.', scheme });
  } catch (error) {
    next(error);
  }
};

// Delete/Archive scheme (Admin)
const deleteScheme = async (req, res, next) => {
  try {
    const scheme = await GovernmentScheme.findByIdAndDelete(req.params.id);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found.' });
    }
    res.json({ success: true, message: 'Scheme archived/deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// AI Scheme Recommendation endpoint
const getRecommendations = async (req, res, next) => {
  try {
    let profileData = req.body;

    // If logged in citizen and no custom profile submitted, load DB profile
    if (req.user && req.user.role === 'CITIZEN' && (!profileData || Object.keys(profileData).length === 0)) {
      const citizenProf = await CitizenProfile.findOne({ user: req.user.id });
      if (citizenProf) {
        profileData = citizenProf.toObject();
      }
    }

    const recommendations = await recommendSchemesForProfile(profileData || {});

    res.json({
      success: true,
      count: recommendations.length,
      recommendations
    });
  } catch (error) {
    next(error);
  }
};

// Interactive Eligibility Wizard calculation
const checkEligibility = async (req, res, next) => {
  try {
    const wizardInputs = req.body; // age, income, state, occupation, education, isStudent, isFarmer, isDisability, isSenior
    const recommendations = await recommendSchemesForProfile(wizardInputs);

    const eligible = recommendations.filter(r => r.eligibilityStatus === 'Potentially Eligible');
    const needsInfo = recommendations.filter(r => r.eligibilityStatus === 'Requires Further Verification');
    const notEligible = recommendations.filter(r => r.eligibilityStatus === 'Criteria Not Matching');

    res.json({
      success: true,
      summary: {
        totalEvaluated: recommendations.length,
        eligibleCount: eligible.length,
        needsInfoCount: needsInfo.length,
        notEligibleCount: notEligible.length
      },
      eligible,
      needsInfo,
      notEligible
    });
  } catch (error) {
    next(error);
  }
};

// Toggle Save Scheme
const toggleSaveScheme = async (req, res, next) => {
  try {
    const { schemeId } = req.body;
    const citizenId = req.user.id;

    const existing = await SavedScheme.findOne({ citizen: citizenId, scheme: schemeId });
    if (existing) {
      await SavedScheme.findByIdAndDelete(existing._id);
      return res.json({ success: true, message: 'Scheme removed from saved bookmarks.', isSaved: false });
    } else {
      await SavedScheme.create({ citizen: citizenId, scheme: schemeId });
      return res.json({ success: true, message: 'Scheme saved to your profile bookmarks.', isSaved: true });
    }
  } catch (error) {
    next(error);
  }
};

// Get Saved Schemes
const getSavedSchemes = async (req, res, next) => {
  try {
    const saved = await SavedScheme.find({ citizen: req.user.id }).populate('scheme');
    const schemes = saved.map(s => s.scheme).filter(Boolean);
    res.json({ success: true, schemes });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
  getRecommendations,
  checkEligibility,
  toggleSaveScheme,
  getSavedSchemes
};
