/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f5',
          100: '#ffe5e5',
          200: '#ffcccc',
          300: '#ff9999',
          400: '#ff6666',
          500: '#FF1E00',
          600: '#cc1800',
          700: '#991200',
          800: '#660c00',
          900: '#330600',
        },
        flexcar: {
          red: '#FF1E00',
          'red-dark': '#CC1800',
          'red-light': '#FF4D33',
        },
      },
    },
  },
  plugins: [],
};
