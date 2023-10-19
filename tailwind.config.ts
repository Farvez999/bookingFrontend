import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // colors: {
      //    primary: "#F2EDE3",
      //    secondary: "#ffffff",
      //    accent: "#4692E7",
      // },
      colors: {
        primary: "#10B981",
        secondary: "#ffffff",
        accent: "#132043",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
