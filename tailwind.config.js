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
        secondaryLight: "#B0B6D8",
        faded: "#b0b0b0",
        white: "#FFFFFF",
        background: "#F5F5F5",
        foreground: "#000000",
      },
    },
  },
  plugins: [],
};
