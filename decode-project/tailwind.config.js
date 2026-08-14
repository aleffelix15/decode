/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  plugins: [],
};
