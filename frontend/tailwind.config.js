/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        },
        accent: "#06b6d4",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        "fade-in":    "fade-in 0.6s ease forwards",
        "slide-up":   "slide-up 0.5s ease forwards",
      },
      keyframes: {
        "gradient-x": {
          "0%,100%": { "background-position": "0% 50%" },
          "50%":      { "background-position": "100% 50%" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        "slide-up": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
