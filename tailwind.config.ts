import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        background: {
          DEFAULT: "var(--background)",
          alt: "var(--background-alt)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          alt: "var(--foreground-alt)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
