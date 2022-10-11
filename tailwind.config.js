/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackBg: "#1C1C1C",
        greenLight: "#3BFF1C",
        secWhite: "#c7c7c7",
        orange: "#F68500",


      },
      fontWeight: {
        1000: 1000
      }
    },
    fontFamily: {
      cairo: ['Cairo']
    }
  },
  plugins: [],
}
