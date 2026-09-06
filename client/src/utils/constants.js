/**
 * JanSeva AI Application Constants and Enums
 */

export const SCHEME_CATEGORIES = [
  'Agriculture & Farming',
  'Education & Scholarships',
  'Healthcare & Wellness',
  'Housing & Infrastructure',
  'Women & Child Development',
  'Employment & Skill Development',
  'Senior Citizen Welfare',
  'Financial Inclusion & Banking'
];

export const APPLICATION_STATUS = {
  PENDING: 'Pending',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected'
};

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Jammu & Kashmir', 'Ladakh'
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
