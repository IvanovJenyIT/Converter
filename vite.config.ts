import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./components.json"),
      "@utils": path.resolve(__dirname, "./utils.json"),
      "@ui": path.resolve(__dirname, "./ui.json"),
      "@lib": path.resolve(__dirname, "./lib.json"),
      "@hooks": path.resolve(__dirname, "./hooks.json"),
    },
  },
});
