import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Urbanist"',
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        coilterracota: "#582828",
        coilbeige: {
          light: "#fdefd9",
          dark: "#fde0b5",
        },
        coilgreen: "#9bb168",
        coilorange: {
          light: "#fe8659",
          dark: "#b2563c",
        },
        coilgray: {
          light: "#f0eaea",
          dark: "#736b66",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
