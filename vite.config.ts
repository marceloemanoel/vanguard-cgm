import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vangard",
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "formatjs",
            {
              idInterpolationPattern: "[sha512:contenthash:base64:6]",
              ast: true,
            },
          ],
        ],
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: [
        path.resolve(__dirname, "./index.html"),
        path.resolve(__dirname, "./404.html"),
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
