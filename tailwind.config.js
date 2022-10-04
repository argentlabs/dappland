const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      serif: ["Barlow", ...defaultTheme.fontFamily.serif],
    },
    fontSize: {
      ...defaultTheme.fontSize,
      button: "17px",
    },
    boxShadow: {
      ...defaultTheme.boxShadow,
      "box-image-shadow": "0px 1px 4px rgba(0, 0, 0, 0.15)",
      "box-image-shadow-hover": "0px 1px 4px rgba(0, 0, 0, 0.2)",
    },
    colors: {
      ...defaultTheme.colors,
      black: "#000",
      white: "#fff",
      pink: "#FF5B81",
      lightgrey: "#8F8D8C",
      clay: "#C2C0BE",
      "light-black": "#333332",
      "smoked-white": "#f7f7f7",
      "light-charcoal": "#8F8E8C",
      "border-grey": "#ededed",
      "dark-charcoal": "#5c5b59",
      "accessible-green": "#02A697",
    },
    extend: {
      gridTemplateColumns: {
        "dapp-header": "2fr 1fr",
      },
    },
  },
  plugins: [],
}
