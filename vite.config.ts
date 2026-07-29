import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { sitesWorkerOutput } from "./build/sites-vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    base: env.VITE_BASE || "/",
    plugins: [react(), sitesWorkerOutput()],
    build: {
      outDir: "dist/client",
      emptyOutDir: true,
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      css: true,
    },
  };
});
