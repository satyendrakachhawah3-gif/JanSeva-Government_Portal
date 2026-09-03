/**
 * Application Receipt Generation Utility
 */

const generateReceiptSummary = (applicationData) => {
  return {
    receiptId: `RCT-${applicationData.applicationId}`,
    generatedAt: new Date().toISOString(),
    citizenName: applicationData.applicantDetails?.fullName,
    schemeName: applicationData.scheme?.name,
    status: applicationData.status,
    verificationCode: Buffer.from(`${applicationData.applicationId}-${Date.now()}`).toString('base64').substring(0, 12)
  };
};

module.exports = {
  generateReceiptSummary
};
