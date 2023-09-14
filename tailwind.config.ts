import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import formsPlugin from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
      gridTemplateColumns: {
        naturals: "repeat(7, minmax(0, 1fr))",
        accidentals: "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [formsPlugin],
};
export default config;
