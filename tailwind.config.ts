import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#050816", surface: "#0F172A" },
      fontFamily: { display: ["Space Grotesk", "sans-serif"], body: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
