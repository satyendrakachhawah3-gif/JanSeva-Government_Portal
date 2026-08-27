const mongoose = require('mongoose');

const applicationDocumentSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true, index: true },
    documentType: { type: String, required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, default: 0 },
    mimeType: { type: String, default: 'application/pdf' },
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'VERIFIED', 'REJECTED', 'REUPLOAD_REQUESTED'],
      default: 'PENDING'
    },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewerRemarks: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ApplicationDocument', applicationDocumentSchema);
