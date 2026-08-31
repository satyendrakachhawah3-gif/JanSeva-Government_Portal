/**
 * JanSeva Logger Utility
 */

const logInfo = (message, meta = {}) => {
  console.log(`[INFO] [${new Date().toISOString()}] ${message}`, Object.keys(meta).length ? meta : '');
};

const logError = (message, error = {}) => {
  console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, error.message || error);
};

const logWarn = (message, meta = {}) => {
  console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, Object.keys(meta).length ? meta : '');
};

module.exports = {
  logInfo,
  logError,
  logWarn
};
