const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetEntity: { type: String, required: true },
    targetId: { type: String, default: '' },
    ipAddress: { type: String, default: '127.0.0.1' },
    details: { type: mongoose.Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
