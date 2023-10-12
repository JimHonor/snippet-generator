import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      sourcemap: mode === "development",
    },
    resolve: {
      alias: {
        "@src": resolve(__dirname, "src"),
      },
    },
  };
});
