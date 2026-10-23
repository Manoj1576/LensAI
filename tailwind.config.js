/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FBF7EF',
          200: '#F5F0E6',
          300: '#EBE3D3',
          400: '#DDD2BD',
          500: '#CBBFA7',
        },
        charcoal: {
          950: '#12100E',
          900: '#1A1714',
          850: '#211D18',
          800: '#2D2822',
          700: '#3D3730',
          600: '#524B43',
        },
        gold: {
          400: '#D9BC8E',
          500: '#C9A876',
          600: '#B08A55',
          700: '#947242',
        },
        warmGray: {
          100: '#EFECE6',
          200: '#DFDAD0',
          300: '#C4BEB2',
          400: '#9E978A',
          500: '#7A746B',
          600: '#5E5850',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widestEditorial: '0.25em',
        tightEditorial: '-0.03em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(26, 23, 20, 0.08)',
        'luxury-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        'gold-glow': '0 0 25px rgba(201, 168, 118, 0.25)',
      }
    },
  },
  plugins: [],
}
