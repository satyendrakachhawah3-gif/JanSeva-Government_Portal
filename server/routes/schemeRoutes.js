const express = require('express');
const router = express.Router();
const {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
  getRecommendations,
  checkEligibility,
  toggleSaveScheme,
  getSavedSchemes
} = require('../controllers/schemeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getSchemes);
router.post('/recommend', getRecommendations);
router.post('/eligibility-check', checkEligibility);

router.get('/saved', protect, getSavedSchemes);
router.post('/saved/toggle', protect, toggleSaveScheme);

router.get('/:id', getSchemeById);
router.post('/', protect, authorize('ADMIN'), createScheme);
router.put('/:id', protect, authorize('ADMIN'), updateScheme);
router.delete('/:id', protect, authorize('ADMIN'), deleteScheme);

module.exports = router;
