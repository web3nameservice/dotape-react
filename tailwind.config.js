/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#3C5EF9",
        main2: "#0171E2",
        darkGray: "#1D1D1F"
      }
    },
  },
  plugins: [],
}
