/**
 * Request Input Sanitizer Middleware
 */

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/[\$]/g, ''); // Strip mongo operator characters
      }
    });
  }
  next();
};

module.exports = sanitizeInput;
