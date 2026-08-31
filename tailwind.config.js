/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0B0F1A",
        card: "#141B2E",
        primary: "#2F6FED",
        primaryLight: "#7C9CFF",
        textPrimary: "#FFFFFF",
        textSecondary: "#9AA3B2",
        progressTrack: "#1E2740",
        navInactive: "#3A4256",
      },
    },
  },
  plugins: [],
};