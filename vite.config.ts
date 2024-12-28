import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig(() => {
  const isStorybook = process.env.STORYBOOK === "true";

  return {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    plugins: [
      react(),
      tsconfigPaths(),
      !isStorybook && reactRouter(), // Solo incluye reactRouter si no estás en Storybook
    ].filter(Boolean), // Elimina los `false` de la lista de plugins
  };
});
