import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados
        primary: {
          DEFAULT: "oklch(0.872 0.01 258.338)", // Azul estándar (puedes cambiarlo)
          nose: "#059669", // Azul más oscuro al hover
        },
        secondary: {
          DEFAULT: "oklch(0.457 0.24 277.023)", // Verde esmeralda
          hover: "#059669",
        },
      },
      backgroundImage: {
        grafico: "url(../public/grafico.svg)",
      },
      backgroundSize: {
        "30": "30rem",
      },
    },
  },
  plugins: [],
};
export default config;
