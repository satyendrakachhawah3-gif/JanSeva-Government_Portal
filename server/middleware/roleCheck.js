/**
 * Role Permission Checkers
 */

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Admin access privilege required.' });
  }
  next();
};

const requireOfficer = (req, res, next) => {
  if (!req.user || (req.user.role !== 'OFFICER' && req.user.role !== 'ADMIN')) {
    return res.status(403).json({ success: false, message: 'Officer access privilege required.' });
  }
  next();
};

const requireCitizen = (req, res, next) => {
  if (!req.user || req.user.role !== 'CITIZEN') {
    return res.status(403).json({ success: false, message: 'Citizen account required.' });
  }
  next();
};

module.exports = {
  requireAdmin,
  requireOfficer,
  requireCitizen
};
