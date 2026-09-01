/**
 * Safe LocalStorage Utilities for Client
 */

export const getStoredToken = () => {
  try {
    return localStorage.getItem('janseva_token') || '';
  } catch (err) {
    return '';
  }
};

export const setStoredToken = (token) => {
  try {
    localStorage.setItem('janseva_token', token);
  } catch (err) {
    console.error('[Storage] Error setting token:', err);
  }
};

export const clearStoredToken = () => {
  try {
    localStorage.removeItem('janseva_token');
  } catch (err) {
    console.error('[Storage] Error clearing token:', err);
  }
};
