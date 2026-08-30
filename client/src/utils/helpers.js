/**
 * Client UI Formatting & Validation Helpers
 */

// Format currency into INR ₹ locale (e.g. 180000 -> ₹1,80,000)
export const formatINR = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

// Format Date string into readable Indian format
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Application status badge styling dictionary
export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'REJECTED':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'UNDER_REVIEW':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ACTION_REQUIRED':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};
