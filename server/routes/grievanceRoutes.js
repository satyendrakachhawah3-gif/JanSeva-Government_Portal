const express = require('express');
const router = express.Router();
const {
  submitGrievance,
  getMyGrievances,
  getAllGrievances,
  updateGrievance
} = require('../controllers/grievanceController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('attachment'), submitGrievance);
router.get('/my-grievances', protect, getMyGrievances);
router.get('/', protect, authorize('OFFICER', 'ADMIN'), getAllGrievances);
router.patch('/:id', protect, authorize('OFFICER', 'ADMIN'), updateGrievance);

module.exports = router;
