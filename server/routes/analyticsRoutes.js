const express = require('express');
const router = express.Router();
const { getDashboardAnalytics } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/stats', protect, authorize('OFFICER', 'ADMIN'), getDashboardAnalytics);

module.exports = router;
