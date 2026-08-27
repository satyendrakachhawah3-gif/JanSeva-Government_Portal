const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  remarks: { type: String, default: '' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const applicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true, unique: true, index: true },
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    scheme: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentScheme', required: true, index: true },
    applicantDetails: {
      fullName: String,
      email: String,
      mobile: String,
      state: String,
      district: String,
      annualIncome: Number,
      occupation: String,
      bankAccountNo: String,
      ifscCode: String,
      bankName: String,
      customFields: mongoose.Schema.Types.Mixed
    },
    status: {
      type: String,
      enum: [
        'SUBMITTED',
        'DOCUMENTS_VERIFIED',
        'UNDER_REVIEW',
        'ACTION_REQUIRED',
        'APPROVED',
        'REJECTED'
      ],
      default: 'SUBMITTED',
      index: true
    },
    submittedAt: { type: Date, default: Date.now },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    officerRemarks: { type: String, default: '' },
    statusHistory: [statusHistorySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
