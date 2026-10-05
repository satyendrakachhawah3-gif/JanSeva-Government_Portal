/**
 * Client URL Query Parameter & Deep Linking Helper Utilities
 */

/**
 * Parse URL query search parameters into key-value object
 * @param {string} searchString 
 * @returns {Object}
 */
export const parseQueryParams = (searchString = window.location.search) => {
  const params = new URLSearchParams(searchString);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
};

/**
 * Build URL query string from object
 * @param {Object} paramsObj 
 * @returns {string} e.g. "?category=Agriculture&state=Rajasthan"
 */
export const buildQueryString = (paramsObj = {}) => {
  const params = new URLSearchParams();
  for (const key in paramsObj) {
    if (paramsObj[key] !== undefined && paramsObj[key] !== null && paramsObj[key] !== '') {
      params.append(key, paramsObj[key]);
    }
  }
  const str = params.toString();
  return str ? `?${str}` : '';
};
