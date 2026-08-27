const mongoose = require('mongoose');

const savedSchemeSchema = new mongoose.Schema(
  {
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    scheme: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentScheme', required: true, index: true }
  },
  { timestamps: true }
);

savedSchemeSchema.index({ citizen: 1, scheme: 1 }, { unique: true });

module.exports = mongoose.model('SavedScheme', savedSchemeSchema);
