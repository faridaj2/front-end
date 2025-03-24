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
      sans: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#22c55e",
        secondary: "#1C1C1C",
        tertiary: "#2B2B2B",
        dark: "#121212",
        brown: "#1E1E1E",
        gold: "#22C55E",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
