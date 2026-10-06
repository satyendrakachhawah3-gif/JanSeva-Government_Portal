/**
 * Query & Route Parameter NoSQL Injection Sanitizer Middleware
 * Strips MongoDB operator keys starting with '$' from req.query and req.params
 */

const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;

  for (const key in obj) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      sanitizeObject(obj[key]);
    }
  }
  return obj;
};

const parameterSanitizer = (req, res, next) => {
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);
  if (req.body) sanitizeObject(req.body);
  next();
};

module.exports = parameterSanitizer;
