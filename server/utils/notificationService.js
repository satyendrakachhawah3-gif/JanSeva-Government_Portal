/**
 * Notification Service Utility for JanSeva Citizen Alerts & Application Status
 */

const Notification = require('../models/Notification');

/**
 * Format HTML email template for application status updates
 * @param {string} userName 
 * @param {string} schemeTitle 
 * @param {string} status 
 * @param {string} applicationId 
 * @returns {string}
 */
const buildEmailTemplate = (userName, schemeTitle, status, applicationId) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #1e3a8a;">JanSeva AI - Application Update</h2>
      <p>Dear <strong>${userName}</strong>,</p>
      <p>Your application status for scheme <strong>${schemeTitle}</strong> (App ID: <code>${applicationId}</code>) has been updated to:</p>
      <div style="padding: 12px; background-color: #f1f5f9; border-left: 4px solid #2563eb; font-size: 18px; font-weight: bold; margin: 16px 0;">
        ${status}
      </div>
      <p>You can track complete details by logging into your JanSeva portal account.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">This is an automated notification from JanSeva AI Government Portal.</p>
    </div>
  `;
};

/**
 * Dispatch system notification record to database
 * @param {string} userId 
 * @param {string} title 
 * @param {string} message 
 * @param {string} type 
 */
const dispatchSystemNotification = async (userId, title, message, type = 'info') => {
  try {
    const notification = new Notification({
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date()
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error dispatching notification:', error);
    return null;
  }
};

module.exports = {
  buildEmailTemplate,
  dispatchSystemNotification
};
