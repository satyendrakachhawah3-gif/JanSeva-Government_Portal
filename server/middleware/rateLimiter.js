const rateLimit = require('express-rate-limit');

// Strict rate limiter for auth endpoints (login / register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts max
  message: { success: false, message: 'Too many authentication attempts. Please try again in 15 minutes.' }
});

// Strict rate limiter for AI Assistant queries
const aiAssistantLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 queries per minute
  message: { success: false, message: 'AI Assistant query limit reached. Please wait a moment.' }
});

module.exports = {
  authLimiter,
  aiAssistantLimiter
};
