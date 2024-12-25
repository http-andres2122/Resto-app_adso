/** @type {import('tailwindcss').Config} */
module.exports = {
  //add dark mode 
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // Incluye todos los archivos de React
  ],
  theme: {
    extend: {}, // Extiende los estilos aquí si lo necesitas
  },
  plugins: [],
};
