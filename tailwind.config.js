/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary
        "bright-blue": "hsl(220, 98%, 61%)",
        "check-background":
          "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",

        // Light Theme
        "light-very-light-gray": "hsl(0, 0%, 98%)",
        "light-very-light-grayish-blue": "hsl(236, 33%, 92%)",
        "light-grayish-blue": "hsl(233, 11%, 84%)",
        "light-dark-grayish-blue": "hsl(236, 9%, 61%)",
        "light-very-dark-grayish-blue": "hsl(235, 19%, 35%)",

        // Dark Theme
        "dark-very-dark-blue": "hsl(235, 21%, 11%)",
        "dark-very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
        "dark-light-grayish-blue": "hsl(234, 39%, 85%)",
        "dark-light-grayish-blue-hover": "hsl(236, 33%, 92%)",
        "dark-dark-grayish-blue": "hsl(234, 11%, 52%)",
        "dark-very-dark-grayish-blue": "hsl(233, 14%, 35%)",
        "dark-very-dark-grayish-blue-2": "hsl(237, 14%, 26%)",
      },
      spacing: {
        275: "275px",
      },
      letterSpacing: {
        "10px": "10px",
      },
      backgroundImage: {
        MobileDark: "url('/bg-mobile-dark.jpg')",
        MobileLight: "url('/bg-mobile-light.jpg')",
        DesktopDark: "url('/bg-desktop-dark.jpg')",
        DesktopLight: "url('/bg-desktop-light.jpg')",
      },
      screens: {
        custom: "370px",
      },
    },
  },
  plugins: [],
};
