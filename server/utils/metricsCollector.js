/**
 * API Runtime Metrics & Performance Collector Utility for JanSeva AI
 */

const os = require('os');

class MetricsCollector {
  constructor() {
    this.routeHits = new Map();
    this.totalRequests = 0;
    this.errorCount = 0;
    this.startTime = Date.now();
  }

  /**
   * Record HTTP request metric
   * @param {string} route 
   * @param {number} statusCode 
   */
  recordRequest(route, statusCode) {
    this.totalRequests += 1;
    if (statusCode >= 400) {
      this.errorCount += 1;
    }

    const cleanRoute = route.split('?')[0];
    const currentHits = this.routeHits.get(cleanRoute) || 0;
    this.routeHits.set(cleanRoute, currentHits + 1);
  }

  /**
   * Retrieve current runtime metrics snapshot
   * @returns {Object}
   */
  getSnapshot() {
    const uptimeSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    const loadAverage = os.loadavg();
    const freeMemMB = Math.round(os.freemem() / 1024 / 1024);
    const totalMemMB = Math.round(os.totalmem() / 1024 / 1024);

    const topRoutes = Array.from(this.routeHits.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([route, hits]) => ({ route, hits }));

    return {
      totalRequests: this.totalRequests,
      errorCount: this.errorCount,
      errorRatePct: this.totalRequests > 0 ? ((this.errorCount / this.totalRequests) * 100).toFixed(2) : '0.00',
      uptimeSeconds,
      system: {
        loadAverage1m: loadAverage[0].toFixed(2),
        freeMemoryMB: freeMemMB,
        totalMemoryMB: totalMemMB,
        memoryUsagePct: (((totalMemMB - freeMemMB) / totalMemMB) * 100).toFixed(1)
      },
      topRoutes
    };
  }
}

const metricsCollector = new MetricsCollector();

module.exports = metricsCollector;
