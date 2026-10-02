import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17251f',
        paper: '#f5f4ed',
        cream: '#fffdf7',
        green: '#0c6b4e',
        forest: '#084735',
        lime: '#c9ed83',
        coral: '#ee7257',
        yellow: '#f6ce65',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Trebuchet MS', 'Arial', 'sans-serif'],
      },
      boxShadow: { soft: '0 18px 50px rgba(23, 37, 31, .11)' },
    },
  },
  plugins: [],
} satisfies Config;