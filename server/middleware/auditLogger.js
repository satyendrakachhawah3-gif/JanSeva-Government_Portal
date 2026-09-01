const AuditLog = require('../models/AuditLog');

const logAuditAction = (action, targetEntity) => {
  return async (req, res, next) => {
    res.on('finish', async () => {
      if (res.statusCode < 400 && req.user) {
        try {
          await AuditLog.create({
            action,
            performedBy: req.user.id,
            targetEntity,
            targetId: req.params.id || req.body.applicationId || '',
            ipAddress: req.ip || req.connection.remoteAddress,
            timestamp: new Date()
          });
        } catch (err) {
          console.error('[AuditLogger] Error writing audit log:', err.message);
        }
      }
    });
    next();
  };
};

module.exports = logAuditAction;
