/**
 * Indian Numbering System (Lakh & Crore) Utility Formatters for JanSeva AI
 */

/**
 * Format raw numbers into Indian Lakhs (Lakh) or Crores (Cr)
 * @param {number} num 
 * @returns {string} Formatted string
 */
export const formatIndianNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '0';

  const absNum = Math.abs(num);
  if (absNum >= 10000000) {
    return `${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Crore`;
  }
  if (absNum >= 100000) {
    return `${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  if (absNum >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')} K`;
  }
  return num.toLocaleString('en-IN');
};

/**
 * Format currency with Lakh / Crore suffix
 * @param {number} amount 
 * @returns {string} e.g. "₹5 Lakh"
 */
export const formatIndianCurrencyShort = (amount) => {
  if (!amount || isNaN(amount)) return '₹0';
  return `₹${formatIndianNumber(amount)}`;
};
