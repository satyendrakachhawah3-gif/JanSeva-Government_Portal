/**
 * Deep Health Status & Diagnostic Utility for JanSeva API Server
 */

const mongoose = require('mongoose');

/**
 * Execute deep health check on server components
 * @returns {Promise<Object>} Diagnostic report object
 */
const performHealthCheck = async () => {
  const startTime = Date.now();
  
  // Database status check
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  const dbStatus = dbStatusMap[dbState] || 'Unknown';
  const isDbHealthy = dbState === 1;

  // System memory usage
  const memoryUsage = process.memoryUsage();
  const uptimeSeconds = process.uptime();

  const responseTimeMs = Date.now() - startTime;

  return {
    status: isDbHealthy ? 'HEALTHY' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${Math.floor(uptimeSeconds % 60)}s`,
    services: {
      database: {
        status: dbStatus,
        healthy: isDbHealthy
      },
      memory: {
        rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
        heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        heapTotalMB: Math.round(memoryUsage.heapTotal / 1024 / 1024)
      }
    },
    latencyMs: responseTimeMs
  };
};

module.exports = {
  performHealthCheck
};
