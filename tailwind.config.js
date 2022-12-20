/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Custom height carousel
      height: {
        128: "48rem",
        100: "34rem",
        98: "30rem",
        97: "27rem",
      },
      padding: {
        22: "86px",
      },
      margin: {
        22: "86px",
      },
    },
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: "1rem",

      // default breakpoints but with 40px removed
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
