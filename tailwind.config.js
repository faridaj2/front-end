// eslint-disable-next-line no-undef
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif']
    },
    extend: {
      colors: {
        'primary': '#22c55e',
        'secondary': '#1C1C1C',
        'tertiary': '#2B2B2B',
      }

    },
  },
  darkMode: "class",
  plugins: [nextui()],
}