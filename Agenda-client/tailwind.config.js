/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cw-orange': '#FF7B10',
        'cw-light-orange': '#FFE6D8',
        'cw-dark-orange': '#984400',
      },
    },
  },
  plugins: [],
};
