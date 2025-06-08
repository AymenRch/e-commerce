/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FEFCF8',
          100: '#FDF9F1',
          200: '#F7F3E9',
          300: '#F0EAD8',
          400: '#E8DFC4',
        },
        sage: {
          100: '#F4F6F0',
          200: '#E8EDE0',
          300: '#D5DEC7',
          400: '#B8C5A0',
        },
        charcoal: {
          800: '#2D2D2D',
          900: '#1A1A1A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
};