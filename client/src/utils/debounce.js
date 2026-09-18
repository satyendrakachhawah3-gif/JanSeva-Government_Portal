/**
 * Client-Side Debounce & Throttle Utilities for UI Event Optimization
 */

/**
 * Debounce function call
 * @param {Function} func 
 * @param {number} delayMs 
 * @returns {Function}
 */
export const debounce = (func, delayMs = 300) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delayMs);
  };
};

/**
 * Throttle function execution
 * @param {Function} func 
 * @param {number} limitMs 
 * @returns {Function}
 */
export const throttle = (func, limitMs = 300) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limitMs);
    }
  };
};
