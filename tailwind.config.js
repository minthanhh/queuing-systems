/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      backgroundColor: {
        primaryColor: '#FF7506',
        primaryBg: '#F6F6F6'
      },
      colors: {
        primaryColor: '#FF7506',
        textGray: '#7E7D88',
        secondary: '#535261',
        notify: '#bf5805'
      },
      borderColor: {
        borderGray: '#D4D4D7',
        primaryBorder: '#FF7506',
        borderBottom: '#e5e5e7'
      }
    },
  },
  plugins: [require("daisyui")],
}

