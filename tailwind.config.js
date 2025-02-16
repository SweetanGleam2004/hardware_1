/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          800: 'var(--color-navy-800)',
          900: 'var(--color-navy-900)',
        },
      },
    },
  },
  plugins: [],
};