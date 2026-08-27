const mongoose = require('mongoose');

const governmentSchemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    department: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Education',
        'Agriculture',
        'Employment',
        'Women & Child Welfare',
        'Health',
        'Housing',
        'Financial Assistance',
        'Entrepreneurship',
        'Senior Citizens',
        'Disability Support',
        'Social Welfare'
      ],
      index: true
    },
    state: { type: String, default: 'All India', index: true },
    targetBeneficiaries: { type: String, default: 'All Citizens' },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    eligibilityCriteria: {
      minAge: { type: Number, default: 0 },
      maxAge: { type: Number, default: 100 },
      maxIncome: { type: Number, default: 10000000 },
      allowedOccupations: [{ type: String }],
      allowedEducation: [{ type: String }],
      allowedStates: [{ type: String }],
      studentOnly: { type: Boolean, default: false },
      farmerOnly: { type: Boolean, default: false },
      disabilityOnly: { type: Boolean, default: false },
      femaleOnly: { type: Boolean, default: false },
      seniorOnly: { type: Boolean, default: false },
      unemployedOnly: { type: Boolean, default: false }
    },
    requiredDocuments: [{ type: String }],
    applicationProcess: [{ type: String }],
    startDate: { type: Date },
    endDate: { type: Date },
    officialUrl: { type: String, default: 'https://myscheme.gov.in' },
    status: {
      type: String,
      enum: ['PUBLISHED', 'DRAFT', 'ARCHIVED'],
      default: 'PUBLISHED',
      index: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

governmentSchemeSchema.index({ name: 'text', description: 'text', department: 'text' });

module.exports = mongoose.model('GovernmentScheme', governmentSchemeSchema);
