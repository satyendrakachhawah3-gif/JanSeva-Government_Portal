const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema(
  {
    grievanceId: { type: String, required: true, unique: true, index: true },
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subject: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Application Delay',
        'Document Issue',
        'Technical Problem',
        'Scheme Issue',
        'Officer Issue',
        'Other'
      ]
    },
    description: { type: String, required: true },
    department: { type: String, default: 'General Public Grievance' },
    location: { type: String, default: 'National Portal' },
    attachmentUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
      default: 'SUBMITTED',
      index: true
    },
    assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolutionNotes: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Grievance', grievanceSchema);
