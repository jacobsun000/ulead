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
        'ulead-gradient': 'linear-gradient(90deg, #6E4AC8 0%, #0796E5 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-50%) translateX(0)' },
          '50%': { transform: 'translateY(calc(-50% - 12px)) translateX(4px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-delayed': 'float2 10s ease-in-out 0.6s infinite',
      },
    },
  },
  plugins: [],
};
