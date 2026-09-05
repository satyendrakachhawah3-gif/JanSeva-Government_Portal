/**
 * Data formatting utility functions for JanSeva AI frontend UI
 */

export const formatCurrencyINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDateDDMMYYYY = (dateInput) => {
  if (!dateInput) return 'N/A';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'Invalid Date';
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const getStatusBadgeColor = (status) => {
  switch (String(status).toLowerCase()) {
    case 'approved':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'rejected':
      return 'bg-rose-100 text-rose-800 border-rose-300';
    case 'under review':
    case 'reviewing':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'pending':
    default:
      return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};
