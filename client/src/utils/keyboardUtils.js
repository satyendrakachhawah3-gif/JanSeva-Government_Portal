/**
 * Keyboard Navigation & Accessibility (a11y) Helper Utilities
 */

/**
 * Handle Enter or Space key press for accessible interactive elements
 * @param {Event} event 
 * @param {Function} callback 
 */
export const handleActionKeyPress = (event, callback) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback(event);
  }
};

/**
 * Handle Escape key press listener
 * @param {Event} event 
 * @param {Function} callback 
 */
export const handleEscapePress = (event, callback) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    callback(event);
  }
};

/**
 * Trap focus inside a modal container
 * @param {HTMLElement} element 
 * @param {Event} event 
 */
export const trapFocus = (element, event) => {
  if (!element || event.key !== 'Tab') return;

  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    lastElement.focus();
    event.preventDefault();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    firstElement.focus();
    event.preventDefault();
  }
};
