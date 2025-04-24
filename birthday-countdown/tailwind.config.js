/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        story: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'storybook': "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
      },
      colors: {
        parchment: '#fdf6e3',
        ink: '#4b2e2e',
      },
    },
  },
  plugins: [],
}
