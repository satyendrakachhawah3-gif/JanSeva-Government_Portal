/**
 * Client-side Theme and High-Contrast Accessibility Utility for JanSeva AI
 */

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'high-contrast'
};

/**
 * Apply theme to document root element
 * @param {string} theme 
 */
export const applyTheme = (theme) => {
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast', 'dark');

  if (theme === THEMES.DARK) {
    root.classList.add('dark', 'theme-dark');
  } else if (theme === THEMES.HIGH_CONTRAST) {
    root.classList.add('theme-high-contrast');
  } else {
    root.classList.add('theme-light');
  }

  localStorage.setItem('janseva_theme', theme);
};

/**
 * Get initial theme preference from localStorage or OS settings
 * @returns {string}
 */
export const getStoredTheme = () => {
  const saved = localStorage.getItem('janseva_theme');
  if (saved && Object.values(THEMES).includes(saved)) {
    return saved;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
};
