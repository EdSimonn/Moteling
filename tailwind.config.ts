/** @format */

import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },

      backgroundImage: {
        banner1: "url('../../../public/assets/banner1.png')",
        banner2: "url('../../../public/assets/banner2.png')",
      },
      colors: {
        primary: "#F89500",
        primary2: "#D17E00",
        secondary: "#131120",
        tertiary: "",
      },
      fontFamily: {
        merriweather2: ["var(--font-merriweather)"],
        pacifico: ["var(--font-pacifico)"],
      },
    },
  },
  plugins: [],
};
export default config;
