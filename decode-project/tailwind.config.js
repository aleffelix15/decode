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
        "2xl": "1536px",
        "3xl": "1920px",
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      maxWidth: {
        "prose": "65ch",
        "screen-sm": "540px",
        "screen-md": "720px",
      },
    },
  },
  plugins: [],
};
