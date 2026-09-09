/**
 * Request Logging Middleware for monitoring HTTP traffic and API response time
 */

const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const { method, originalUrl } = req;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const logString = `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${duration}ms - IP: ${ip}`;

    if (statusCode >= 500) {
      console.error(`\x1b[31m${logString}\x1b[0m`);
    } else if (statusCode >= 400) {
      console.warn(`\x1b[33m${logString}\x1b[0m`);
    } else {
      console.log(`\x1b[32m${logString}\x1b[0m`);
    }
  });

  next();
};

module.exports = requestLogger;
