/**
 * Client-Side DOM Utilities for JanSeva Portal UI
 */

/**
 * Update document page title dynamically
 * @param {string} title 
 */
export const setPageTitle = (title) => {
  document.title = title ? `${title} | JanSeva AI Government Portal` : 'JanSeva AI - Government Welfare Schemes Portal';
};

/**
 * Copy text to clipboard with fallback
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    console.error('Failed to copy text to clipboard:', err);
    return false;
  }
};

/**
 * Smooth scroll to DOM element by ID
 * @param {string} elementId 
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
