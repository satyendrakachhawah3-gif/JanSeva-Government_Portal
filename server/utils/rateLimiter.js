/**
 * Simple In-Memory Rate Limiter Utility for JanSeva API Endpoints
 */

class RateLimiter {
  constructor(windowMs = 15 * 60 * 1000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.hits = new Map();

    // Periodic cleanup of expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  cleanup() {
    const now = Date.now();
    for (const [ip, data] of this.hits.entries()) {
      if (now - data.startTime > this.windowMs) {
        this.hits.delete(ip);
      }
    }
  }

  middleware() {
    return (req, res, next) => {
      const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const now = Date.now();

      if (!this.hits.has(ip)) {
        this.hits.set(ip, { count: 1, startTime: now });
        return next();
      }

      const record = this.hits.get(ip);
      if (now - record.startTime > this.windowMs) {
        // Reset window
        record.count = 1;
        record.startTime = now;
        return next();
      }

      record.count += 1;
      if (record.count > this.maxRequests) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests from this IP, please try again later.',
          retryAfterSeconds: Math.ceil((record.startTime + this.windowMs - now) / 1000)
        });
      }

      next();
    };
  }
}

module.exports = RateLimiter;
