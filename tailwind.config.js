/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#10B981",
          blue: "#3B82F6",
          orange: "#F97316",
          success: "#06B6D4",
          danger: "#EF4444",
          ink: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top right, rgba(16, 185, 129, 0.18), transparent 30%), radial-gradient(circle at left center, rgba(59, 130, 246, 0.18), transparent 26%)",
      },
    },
  },
  plugins: [],
};
