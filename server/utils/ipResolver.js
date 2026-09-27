/**
 * Client Real IP Address Resolver Utility
 * Resolves true client IP address behind reverse proxies (Nginx, Cloudflare, AWS ALB)
 */

/**
 * Extract true client IP address from HTTP request headers
 * @param {Object} req Express request object
 * @returns {string} Clean IP address
 */
const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    // x-forwarded-for may contain comma-separated IPs (client, proxy1, proxy2)
    const clientIp = forwardedFor.split(',')[0].trim();
    if (clientIp) return clientIp;
  }

  const realIp = req.headers['x-real-ip'] || req.headers['cf-connecting-ip'];
  if (realIp) return String(realIp).trim();

  return req.ip || req.socket.remoteAddress || '127.0.0.1';
};

module.exports = {
  getClientIp
};
