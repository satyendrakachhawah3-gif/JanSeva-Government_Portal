const mongoose = require('mongoose');

const citizenProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    dob: { type: Date },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Transgender', 'Other'], default: 'Other' },
    state: { type: String, required: true, index: true },
    district: { type: String, required: true, index: true },
    address: { type: String, default: '' },
    pincode: { type: String, default: '' },
    annualIncome: { type: Number, required: true, default: 0 },
    occupation: { type: String, default: 'Other' },
    education: { type: String, default: 'Graduate' },
    maritalStatus: { type: String, enum: ['Single', 'Married', 'Widowed', 'Divorced'], default: 'Single' },
    familySize: { type: Number, default: 1 },
    casteCategory: { type: String, enum: ['General', 'OBC', 'SC', 'ST', 'EWS'], default: 'General' },
    // Special statuses
    isStudent: { type: Boolean, default: false },
    isFarmer: { type: Boolean, default: false },
    isDisability: { type: Boolean, default: false },
    isVeteran: { type: Boolean, default: false },
    isUnemployed: { type: Boolean, default: false },
    isSeniorCitizen: { type: Boolean, default: false },
    isWomanApplicant: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CitizenProfile', citizenProfileSchema);
