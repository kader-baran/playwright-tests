import { defineConfig } from "@playwright/test";
import path from "path";

export default defineConfig({
  testDir: path.resolve(__dirname, "../tests"),
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
});
