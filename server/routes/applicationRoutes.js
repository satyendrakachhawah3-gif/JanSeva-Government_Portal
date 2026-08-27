const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  uploadDocument,
  verifyDocumentStatus
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, authorize('CITIZEN'), submitApplication);
router.get('/my-applications', protect, authorize('CITIZEN'), getMyApplications);
router.get('/', protect, authorize('OFFICER', 'ADMIN'), getAllApplications);
router.get('/:id', protect, getApplicationById);
router.patch('/:id/status', protect, authorize('OFFICER', 'ADMIN'), updateApplicationStatus);
router.post('/upload-document', protect, upload.single('file'), uploadDocument);
router.patch('/documents/:documentId/status', protect, authorize('OFFICER', 'ADMIN'), verifyDocumentStatus);

module.exports = router;
