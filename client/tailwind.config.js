/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        100: '100',
      },
      fontFamily: {
        dancing: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
};
