/**
 * Content-Type Header Validation Middleware
 * Enforces JSON content-type header on POST, PUT, and PATCH API requests
 */

const enforceJsonContentType = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    // Allow multipart/form-data for file uploads
    if (!contentType || (!contentType.includes('application/json') && !contentType.includes('multipart/form-data'))) {
      return res.status(415).json({
        success: false,
        message: 'Unsupported Media Type: Request Content-Type must be application/json or multipart/form-data'
      });
    }
  }
  next();
};

module.exports = enforceJsonContentType;
