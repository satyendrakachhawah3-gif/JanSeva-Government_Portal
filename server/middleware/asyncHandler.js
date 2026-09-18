/**
 * Async Handler Middleware Wrapper
 * Eliminates try-catch blocks in Express route handlers by forwarding errors to global error middleware
 * @param {Function} fn 
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
