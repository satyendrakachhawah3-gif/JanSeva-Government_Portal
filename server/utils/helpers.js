/**
 * Server-side helper functions for JanSeva AI Government Portal
 */

/**
 * Generate a URL-friendly slug from a scheme title
 * @param {string} title 
 * @returns {string}
 */
const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Generate a 6-digit numeric OTP for verification
 * @returns {string}
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Calculate pagination offset and limit for MongoDB queries
 * @param {number|string} page 
 * @param {number|string} limit 
 * @returns {Object} { page, limit, skip }
 */
const getPagination = (page = 1, limit = 10) => {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (parsedPage - 1) * parsedLimit;
  return { page: parsedPage, limit: parsedLimit, skip };
};

/**
 * Sanitize object string values to prevent basic XSS script injection
 * @param {Object} obj 
 * @returns {Object}
 */
const sanitizeInput = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  const sanitized = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      sanitized[key] = obj[key].replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
    } else if (typeof obj[key] === 'object') {
      sanitized[key] = sanitizeInput(obj[key]);
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
};

module.exports = {
  generateSlug,
  generateOTP,
  getPagination,
  sanitizeInput
};
