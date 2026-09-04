const crypto = require('crypto');

/**
 * Generate a unique secure payload and hash for scheme application receipt QR code
 * @param {Object} applicationData 
 * @returns {Object} QR metadata payload
 */
const generateReceiptQRData = (applicationData) => {
  const { applicationId, schemeId, userId, appliedAt } = applicationData;
  
  const rawString = `${applicationId}-${schemeId}-${userId}-${appliedAt}`;
  const securityHash = crypto.createHash('sha256').update(rawString).digest('hex').substring(0, 16);

  const qrPayload = {
    appId: applicationId,
    scheme: schemeId,
    hash: securityHash,
    verifyUrl: `https://janseva.gov.in/verify-receipt?id=${applicationId}&hash=${securityHash}`,
    timestamp: new Date().toISOString()
  };

  return {
    qrString: JSON.stringify(qrPayload),
    verificationHash: securityHash
  };
};

module.exports = {
  generateReceiptQRData
};
