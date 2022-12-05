/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_blue: "#232a3e",
      },
      fontSize: {
        xs: "11px",
        sm: "11px",
        base: "13px",
        lg: "16px",
        xl: "20px",
      },
    },
  },
  plugins: [],
};
