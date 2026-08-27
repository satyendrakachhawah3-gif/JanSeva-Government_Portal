const mongoose = require('mongoose');

const governmentOfficeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, default: 'Citizen Service Center' },
    department: { type: String, default: 'Public Service Delivery' },
    district: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    address: { type: String, required: true },
    contactNumber: { type: String, default: '1800-111-222' },
    email: { type: String, default: 'helpdesk@janseva.gov.in' },
    openingHours: { type: String, default: '09:00 AM - 05:30 PM (Mon-Sat)' },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    servicesOffered: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('GovernmentOffice', governmentOfficeSchema);
