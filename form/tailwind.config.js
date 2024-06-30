/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
import daisyui from "daisyui";
import tailwindcssTypography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  plugins: [tailwindcssTypography, daisyui],
};
