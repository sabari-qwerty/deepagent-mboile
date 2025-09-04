/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
        },
        text: {
          primary: "#06152d",
          secondary: "#586474",
        },
        border: {
          primary: "#E2E5E9",
        },
      },
    },
  },
  plugins: [],
};
