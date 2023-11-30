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

      keyframes: {
        slideUpFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideUpFadeIn: 'slideUpFadeIn 1s ease-out',
      },
    },

    backdropBlur: {
      25: '25px',
    },
  },
  plugins: [],
};
