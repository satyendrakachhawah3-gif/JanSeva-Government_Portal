/**
 * Compression Middleware for API JSON Payload Optimization
 */

const compression = require('compression');

// Filter function to determine whether to compress response
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // Don't compress responses if this request header is present
    return false;
  }
  // Fallback to standard compression filter
  return compression.filter(req, res);
};

const compressionMiddleware = compression({
  filter: shouldCompress,
  level: 6, // Optimal balance between CPU usage and gzip compression ratio
  threshold: 1024 // Only compress responses above 1KB
});

module.exports = compressionMiddleware;
