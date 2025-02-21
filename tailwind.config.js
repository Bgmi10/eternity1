module.exports = {
  theme: {
    extend: {
      fontFamily: {
        asap: ['"Asap Condensed"', 'Oswald', 'sans-serif'],
      },
      animation: {
        shine: 'shine 2s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': {
            backgroundPosition: '100% 0',
          },
          '100%': {
            backgroundPosition: '-100% 0',
          },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
  