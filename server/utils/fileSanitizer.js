/**
 * Upload Document MIME Type & Extension Sanitizer for JanSeva AI
 */

const path = require('path');

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg'
];

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

/**
 * Validate uploaded file extension and MIME type
 * @param {Object} file Multer file object
 * @returns {Object} { isValid, reason }
 */
const validateUploadFile = (file) => {
  if (!file) {
    return { isValid: false, reason: 'No file provided' };
  }

  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { isValid: false, reason: `File extension ${ext} is not allowed` };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return { isValid: false, reason: `File MIME type ${file.mimetype} is not allowed` };
  }

  // Prevent double extension tricks (e.g., file.pdf.exe)
  const parts = file.originalname.split('.');
  if (parts.length > 2) {
    const lastExt = `.${parts[parts.length - 1].toLowerCase()}`;
    const secondLastExt = `.${parts[parts.length - 2].toLowerCase()}`;
    if (ALLOWED_EXTENSIONS.includes(lastExt) && ['.exe', '.sh', '.js', '.php', '.bat'].includes(secondLastExt)) {
      return { isValid: false, reason: 'Suspicious double file extension detected' };
    }
  }

  return { isValid: true };
};

module.exports = {
  validateUploadFile,
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES
};
