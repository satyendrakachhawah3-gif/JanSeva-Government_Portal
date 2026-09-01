/**
 * Standardized API Response Handlers
 */

const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data
  });
};

const sendError = (res, statusCode = 400, message = 'An error occurred', errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
};

module.exports = {
  sendSuccess,
  sendError
};
