/**
 * Safe LocalStorage & SessionStorage helper utilities with JSON fallback
 */

export const getItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
    return false;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
    return false;
  }
};

export const getAuthToken = () => {
  return getItem('janseva_token', null);
};

export const setAuthToken = (token) => {
  return setItem('janseva_token', token);
};

export const clearAuthToken = () => {
  removeItem('janseva_token');
  removeItem('janseva_user');
};
