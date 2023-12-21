import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-lavender": "#F3E8FF",
        "sky-blue": "#87CEEB",
        "dark-gray": "#333333",
        "neon-green": "#39FF14",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["M PLUS Rounded 1c", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#eee",

          secondary: "#222",

          accent: "#fff",

          neutral: "#222",

          "base-100": "#eee",

          info: "#009dff",

          success: "#00f15f",

          warning: "#ffffff",

          error: "#ffffff",
        },
      },
    ],
  },
};
export default config;
