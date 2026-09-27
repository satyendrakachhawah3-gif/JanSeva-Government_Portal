/**
 * Server Maintenance Mode Middleware
 * Allows administrators to temporarily set API endpoints into read-only maintenance state
 */

let isMaintenanceMode = false;

/**
 * Toggle maintenance state
 * @param {boolean} status 
 */
const setMaintenanceMode = (status) => {
  isMaintenanceMode = Boolean(status);
};

const maintenanceCheck = (req, res, next) => {
  // Allow admin routes and health check during maintenance
  if (isMaintenanceMode && !req.path.startsWith('/api/admin') && req.path !== '/api/health') {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      return res.status(503).json({
        success: false,
        message: 'System is currently undergoing scheduled maintenance. Write operations are temporarily suspended.',
        maintenance: true
      });
    }
  }
  next();
};

module.exports = {
  maintenanceCheck,
  setMaintenanceMode
};
