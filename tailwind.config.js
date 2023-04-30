/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "victoria" : "#4D478D",
        "kimberly" : "#6B6790",
        "jacarta" : "#3A3171",
        "titan-white" : "#DEE3FF",
        "titan-white-light" : "#E7E7FF",
        "alto" : "#DDDDDD",
        "gray" : "#8C8C8C",
        "gallery" : "#EFEFEF",
        "selago" : "#EDEDFC",
        "albaster" : "#FCFCFC",
        "butterfly-bush" : "#5A559C",
        "lilac" : "#FFABAB",
        "waterloo" : "#787C99",
        "white-lilac" : "#F4F5FB"
      },
      borderColor : {
        "victoria" : "#4D478D",
        "kimberly" : "#6B6790",
        "titan-white" : "#DEE3FF",
        "titan-white-light" : "#E7E7FF",
        "alto" : "#DDDDDD",
        "gray" : "#8C8C8C",
        "selago" : "#EDEDFC",
        "jacarta" : "#3A3171",
      }
    },
  },
  plugins: [],
}

