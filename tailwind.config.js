/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/simulations/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [],
};

module.exports = config;