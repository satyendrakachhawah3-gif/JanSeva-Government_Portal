/**
 * Client API Error Message Extractor & Formatting Utilities
 */

/**
 * Extract user-friendly error message string from HTTP error response or exception
 * @param {Error|Object} error 
 * @param {string} fallbackMessage 
 * @returns {string}
 */
export const getErrorMessage = (error, fallbackMessage = 'An unexpected error occurred. Please try again.') => {
  if (!error) return fallbackMessage;

  // Handle Axios / Fetch response error payloads
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (typeof data.message === 'string') return data.message;
    if (typeof data.error === 'string') return data.error;
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors.map(e => e.msg || e.message || e).join(', ');
    }
  }

  // Handle standard JavaScript Error objects
  if (typeof error.message === 'string') {
    if (error.message.includes('Network Error')) {
      return 'Network connection lost. Please check your internet connection.';
    }
    return error.message;
  }

  if (typeof error === 'string') return error;

  return fallbackMessage;
};
