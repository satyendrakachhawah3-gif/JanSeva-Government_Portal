/**
 * Input Validator for Government Schemes & Applications
 */

const validateSchemePayload = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push('Scheme name is required and must be at least 3 characters.');
  }

  if (!data.code || data.code.trim().length < 3) {
    errors.push('Scheme unique code is required.');
  }

  if (!data.department || data.department.trim().length < 2) {
    errors.push('Administering department name is required.');
  }

  if (!data.category) {
    errors.push('Scheme sector category is required.');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Detailed scheme description is required.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateApplicationPayload = (data) => {
  const errors = [];

  if (!data.schemeId) {
    errors.push('Scheme ID is required for application submission.');
  }

  if (!data.applicantDetails || !data.applicantDetails.fullName) {
    errors.push('Applicant full legal name is required.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateSchemePayload,
  validateApplicationPayload
};
