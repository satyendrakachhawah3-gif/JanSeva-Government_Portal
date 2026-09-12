/**
 * HTTP Security Headers Middleware for JanSeva API Server
 * Hardens Express API responses against common web vulnerability vectors
 */

const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent framing to protect against Clickjacking attacks
  res.setHeader('X-Frame-Options', 'DENY');

  // Enable XSS Protection filter in legacy browsers
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Control referrer information sent in HTTP headers
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Enforce HTTP Strict Transport Security (HSTS) in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Remove X-Powered-By header to prevent server technology footprinting
  res.removeHeader('X-Powered-By');

  next();
};

module.exports = securityHeaders;
