/**
 * Schema Request Payload Validator Middleware
 * Validates presence and types of required fields in Express request body
 */

const validateRequiredFields = (requiredFields = []) => {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body: Expected JSON object payload.'
      });
    }

    const missingFields = [];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required request parameters: ${missingFields.join(', ')}`,
        missingFields
      });
    }

    next();
  };
};

module.exports = {
  validateRequiredFields
};
