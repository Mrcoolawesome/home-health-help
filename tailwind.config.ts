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
        good: "var(--good)",
        warning: "var(--warning)",
        error: "var(--error)",
        // Popover colors used by dropdowns/menus
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
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
