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
      backgroundImage: {
        'ulead-gradient': 'linear-gradient(135deg, #6E4AC8 0%, #0796E5 100%)',
        'ulead-gradient-horizontal': 'linear-gradient(90deg, #6E4AC8 0%, #0796E5 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
