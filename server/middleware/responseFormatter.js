/**
 * Standardized API Response Formatter Middleware
 * Attaches convenient response helper methods to Express res object
 */

const responseFormatter = (req, res, next) => {
  /**
   * Send success response
   * @param {*} data 
   * @param {string} message 
   * @param {number} statusCode 
   */
  res.success = (data = null, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  };

  /**
   * Send error response
   * @param {string} message 
   * @param {number} statusCode 
   * @param {*} errors 
   */
  res.error = (message = 'Internal Server Error', statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
      timestamp: new Date().toISOString()
    });
  };

  next();
};

module.exports = responseFormatter;
