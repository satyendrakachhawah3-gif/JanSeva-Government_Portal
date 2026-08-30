/**
 * JanSeva AI System Constants & Metadata Dictionary
 */

const SCHEME_CATEGORIES = [
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
];

const APPLICATION_STATUSES = {
  SUBMITTED: 'SUBMITTED',
  DOCUMENTS_VERIFIED: 'DOCUMENTS_VERIFIED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  ACTION_REQUIRED: 'ACTION_REQUIRED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

const USER_ROLES = {
  CITIZEN: 'CITIZEN',
  OFFICER: 'OFFICER',
  ADMIN: 'ADMIN'
};

const TOLL_FREE_HELPLINES = {
  NATIONAL: '1800-111-222',
  SCHOLARSHIP_DESK: '1800-425-0000',
  CPGRAMS: '1800-110-001'
};

module.exports = {
  SCHEME_CATEGORIES,
  APPLICATION_STATUSES,
  USER_ROLES,
  TOLL_FREE_HELPLINES
};
