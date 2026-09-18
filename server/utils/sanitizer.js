/**
 * Input Sanitization Utility for JanSeva AI Government Portal
 */

/**
 * Strip potential XSS HTML scripts and unsafe characters from string
 * @param {string} str 
 * @returns {string}
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
};

/**
 * Sanitize search query input
 * @param {string} query 
 * @returns {string}
 */
const sanitizeSearchQuery = (query) => {
  if (!query) return '';
  return String(query)
    .replace(/[^\w\s-]/gi, '')
    .trim()
    .slice(0, 100);
};

module.exports = {
  sanitizeString,
  sanitizeSearchQuery
};
