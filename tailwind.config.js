/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#3B81F6",
        main2: "#0171E2",
        darkGray: "#1D1D1F",
        dark950: "rgb(9 9 11)",
        dark900: "rgb(24 24 27)",
        dark800: "rgb(39 39 42)",
        dark700: "rgb(63 63 70)",
        dark600: "rgb(82 82 91)",
        dark500: "rgb(113 113 122)",
        dark400: "rgb(161 161 170)",
        blueInfoBg: "#1E2042",
        blueBg: "#1E2042",
      }
    },
  },
  plugins: [],
}
