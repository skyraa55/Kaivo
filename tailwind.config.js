/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
  theme: {
  extend: {
    fontFamily: {
      display: ['Cormorant Garamond', 'serif'],
      body: ['Montserrat', 'sans-serif'],
      sans: ['Montserrat', 'sans-serif'], // ← add this
    },
  },
},
}
