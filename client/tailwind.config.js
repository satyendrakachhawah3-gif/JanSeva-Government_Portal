/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0B2545',
          deep: '#0F3A60',
          lightBlue: '#E8F1F5',
          accentSaffron: '#E65100',
          brightSaffron: '#FF9933',
          emerald: '#138808',
          brightGreen: '#16A34A',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov-soft': '0 4px 20px -2px rgba(11, 37, 69, 0.08)',
        'gov-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'gov-hover': '0 10px 25px -5px rgba(11, 37, 69, 0.12), 0 8px 10px -6px rgba(11, 37, 69, 0.06)'
      }
    },
  },
  plugins: [],
}
