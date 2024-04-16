/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "780px" },
        widescreen: { min: "780px" },
      },
      colors: {
        primary: "#1AC9FF",
        secondary: "#0198EA",
        background: "#060606",
        foreground: "#171923",
        front: "#FFFFFF",
        back: "#0a0a0a",
        mute: "#718096",
        border: "#171923",
        "tron-red": "#EB0029",
      },
      borderRadius: {
        inherit: "inherit",
      },
      transitionDuration: {
        inherit: "inherit",
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        raleway: '"Raleway", sans-serif',
        spaceGrotesk: '"Space Grotesk", sans-serif',
      },
      zIndex: {
        1: 1,
      },
    },
  },
  plugins: [],
};
