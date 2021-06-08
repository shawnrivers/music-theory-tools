/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'media',
  theme: {
    extend: {
      gridTemplateColumns: {
        naturals: 'repeat(7, minmax(0, 1fr))',
        accidentals: 'repeat(12, minmax(0, 1fr))',
      },
      colors: {
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
