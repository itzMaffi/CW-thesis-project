/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cp-blue': '#3E4784',
        'cp-light-blue': '#EAECF5',
        'cp-dark-blue': '#293056',
        'cp-middle-blue': '#9EA5D1',
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

    safelist: [
      'animate-[fade-in_1s_ease-in-out]',
      'animate-[fade-in-down_1s_ease-in-out]',
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar-hide'),
    // eslint-disable-next-line no-undef
    require('tw-elements/dist/plugin.cjs'),
  ],
};
