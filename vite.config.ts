import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The design system page in src/docs/. The npm package has its own config,
// vite.lib.config.ts.
export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist-site" },
});
