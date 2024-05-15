/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "almost-blue": "rgba(81, 78, 243, 1)",
        "almost-grey": "rgba(214, 225, 230, 1)",
        "almost-gray": "rgba(126, 146, 162, 1)",
      },
    },
  },
  plugins: [],
};
