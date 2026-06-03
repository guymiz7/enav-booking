import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-heebo)", "-apple-system", "system-ui", "sans-serif"],
        display: [
          "var(--font-assistant)",
          "var(--font-heebo)",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        navy: "#102B4B",
        gold: "#C9A961",
      },
    },
  },
  plugins: [],
};

export default config;
