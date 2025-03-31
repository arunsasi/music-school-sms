
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
      // Minimal extensions for Tailwind, since we're mainly using Material UI
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
