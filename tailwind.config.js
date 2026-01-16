/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f9ede8',
          200: '#f3dcd4',
          300: '#e9c1b4',
          400: '#dd9d8a',
          500: '#d17d67',
          600: '#c06655',
          700: '#a05346',
          800: '#84453d',
          900: '#6e3d36',
        },
        secondary: {
          50: '#faf8f9',
          100: '#f3eff2',
          200: '#e9e1e7',
          300: '#d9c9d5',
          400: '#c4aabf',
          500: '#ac8aa5',
          600: '#936f8c',
          700: '#7a5b74',
          800: '#664d61',
          900: '#564252',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
