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
        secondary: "#213A6C",
        white: "#ffffff",
        background: "#ffffff",
        foreground: "#000000",
      },
    },
  },
  plugins: [],
};
