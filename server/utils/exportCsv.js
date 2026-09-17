/**
 * CSV Exporter Utility for JanSeva AI Admin Analytics & Reports
 */

/**
 * Convert array of application objects into CSV string
 * @param {Array<Object>} applications 
 * @returns {string} CSV formatted content
 */
const generateApplicationsCSV = (applications = []) => {
  const headers = ['Application ID', 'Citizen Name', 'Aadhaar (Last 4)', 'Scheme Title', 'State', 'Status', 'Applied Date'];
  
  const rows = applications.map(app => {
    const appId = `"${app._id || app.applicationId || ''}"`;
    const name = `"${(app.userName || app.userId?.name || '').replace(/"/g, '""')}"`;
    const aadhaar = `"${app.aadhaarLast4 || 'XXXX'}"`;
    const scheme = `"${(app.schemeTitle || app.schemeId?.title || '').replace(/"/g, '""')}"`;
    const state = `"${(app.state || app.userId?.state || '').replace(/"/g, '""')}"`;
    const status = `"${app.status || 'Pending'}"`;
    const date = `"${app.createdAt ? new Date(app.createdAt).toISOString().split('T')[0] : ''}"`;

    return [appId, name, aadhaar, scheme, state, status, date].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};

module.exports = {
  generateApplicationsCSV
};
