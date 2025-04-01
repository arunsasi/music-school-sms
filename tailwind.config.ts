
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        sidebar: {
          background: "#1A1F2C",
          border: "rgba(255,255,255,0.1)",
          foreground: "#ffffff",
          accent: "rgba(255,255,255,0.1)",
          "accent-foreground": "#ffffff",
        },
        music: {
          500: "#9b87f5",
          600: "#7E69AB",
        },
        primary: {
          DEFAULT: "#9b87f5",
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
