/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0e27',
          800: '#1a1f3a'
        },
        primary: {
          DEFAULT: '#4F46E5'
        }
      },
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'Inter', 'sans-serif']
      },
      screens: {
        xs: '480px'
      }
    }
  },
  plugins: []
};

