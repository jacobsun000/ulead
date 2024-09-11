/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B62C3A",
        primaryLight: "#F59793",
        secondary: "#213A6C",
        faded: "#b0b0b0",
        white: "#FFFFFF",
        background: "#FFFFFF",
        foreground: "#000000",
      },
    },
  },
  plugins: [],
};
