/**
 * PDF Application Receipt Generator Helper for JanSeva AI
 */

const { generateReceiptQRData } = require('./qrCodeGenerator');

/**
 * Construct HTML string for PDF rendering of scheme application receipt
 * @param {Object} application 
 * @returns {string} HTML content suitable for PDF conversion
 */
const buildReceiptHTML = (application) => {
  const { applicationId, userName, schemeTitle, category, state, createdAt } = application;
  const qrData = generateReceiptQRData({ applicationId, schemeId: schemeTitle, userId: userName, appliedAt: createdAt });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>JanSeva Receipt - ${applicationId}</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; padding: 40px; margin: 0; }
        .header { border-bottom: 3px solid #1e3a8a; padding-bottom: 20px; text-align: center; }
        .title { color: #1e3a8a; font-size: 24px; font-weight: bold; margin: 0; }
        .subtitle { color: #64748b; font-size: 14px; margin-top: 5px; }
        .details-table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        .details-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
        .label { font-weight: bold; color: #475569; width: 35%; }
        .value { color: #0f172a; }
        .qr-section { text-align: center; margin-top: 40px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">JANSEVA AI GOVERNMENT PORTAL</h1>
        <p class="subtitle">Official Citizen Welfare Scheme Application Acknowledgment</p>
      </div>

      <table class="details-table">
        <tr><td class="label">Application Reference:</td><td class="value"><strong>${applicationId}</strong></td></tr>
        <tr><td class="label">Applicant Name:</td><td class="value">${userName}</td></tr>
        <tr><td class="label">Scheme Name:</td><td class="value">${schemeTitle}</td></tr>
        <tr><td class="label">Category:</td><td class="value">${category || 'General Welfare'}</td></tr>
        <tr><td class="label">State / Region:</td><td class="value">${state}</td></tr>
        <tr><td class="label">Submission Date:</td><td class="value">${new Date(createdAt).toLocaleDateString('en-IN')}</td></tr>
        <tr><td class="label">Verification Hash:</td><td class="value"><code>${qrData.verificationHash}</code></td></tr>
      </table>

      <div class="qr-section">
        <p><strong>Scan QR Code at nearest Seva Kendra to verify receipt authenticity</strong></p>
        <div style="font-size: 11px; word-break: break-all; color: #64748b;">${qrData.verifyUrl}</div>
      </div>

      <div class="footer">
        JanSeva AI Platform &bull; Ministry of Electronics & IT Public Digital Infrastructure &bull; https://janseva.gov.in
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  buildReceiptHTML
};
