/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brown" : "#D4A373",
        "green" : "#d4ddb6",
        "dark-blue" : "#216693",
        "dark-brown" : "#e49d23",
        "light-blue" : "#6ea8d8",
        "light-green" : "#faedcd",
        "very-lightblue" : "#e3f2f6",
        "cream-green" : "#e9edc9"
      } 
    },
  },
  plugins: [],
}

