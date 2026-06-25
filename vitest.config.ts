import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
