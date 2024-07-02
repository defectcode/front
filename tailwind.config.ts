import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        'neg-2percent': '-0.03em',
      },
      colors: {
        'dark-gray': '#1a1a1a',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        ekMukta: ['var(--font-family-ek-mukta)', 'sans-serif'],
        avenirRoman: ['Avenir', 'sans-serif'],
        avenirHeavy: ['Avenir', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;


