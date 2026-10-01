/**
 * Admin Administrative Action Audit Logger Middleware
 * Logs officer state changes, scheme status updates, and deletions for governance transparency
 */

const auditLogger = (actionType) => {
  return (req, res, next) => {
    res.on('finish', () => {
      // Only audit successful state mutations (2xx)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const adminId = req.user ? (req.user._id || req.user.id) : 'SYSTEM/ANONYMOUS';
        const targetUrl = req.originalUrl;
        const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';

        const auditRecord = {
          timestamp: new Date().toISOString(),
          action: actionType,
          adminId,
          targetUrl,
          ip,
          statusCode: res.statusCode
        };

        console.log(`[AUDIT TRAIL] Action: ${auditRecord.action} | Admin: ${auditRecord.adminId} | URL: ${auditRecord.targetUrl} | IP: ${auditRecord.ip}`);
      }
    });
    next();
  };
};

module.exports = auditLogger;
