/**
 * Endpoint-Specific Rate Limiting Configurations
 */

const RateLimiter = require('../utils/rateLimiter');

// Strict rate limit for auth endpoints (10 requests per 15 minutes)
const authLimiter = new RateLimiter(15 * 60 * 1000, 10).middleware();

// Moderate rate limit for AI Chatbot queries (30 requests per 15 minutes)
const chatbotLimiter = new RateLimiter(15 * 60 * 1000, 30).middleware();

// Relaxed rate limit for public scheme search & viewing (150 requests per 15 minutes)
const schemeSearchLimiter = new RateLimiter(15 * 60 * 1000, 150).middleware();

module.exports = {
  authLimiter,
  chatbotLimiter,
  schemeSearchLimiter
};
