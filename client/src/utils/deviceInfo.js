/**
 * Client Device Type and Network Connection Status Utilities
 */

/**
 * Check if user is accessing on mobile device viewport
 * @returns {boolean}
 */
export const isMobileViewport = () => {
  return window.innerWidth <= 768;
};

/**
 * Check connection status and network quality
 * @returns {Object} { isOnline, effectiveType, saveData }
 */
export const getNetworkInfo = () => {
  const isOnline = navigator.onLine;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};

  return {
    isOnline,
    effectiveType: connection.effectiveType || '4g',
    saveData: Boolean(connection.saveData)
  };
};

/**
 * Register online/offline status listener
 * @param {Function} callback 
 * @returns {Function} Unsubscribe cleanup function
 */
export const subscribeNetworkStatus = (callback) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};
