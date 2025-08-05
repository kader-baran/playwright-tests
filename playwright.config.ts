import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./backend-tests/tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",

  // API testleri için timeout ayarları
  timeout: 30000,
  expect: {
    timeout: 10000,
  },

  use: {
    // API testleri için headless mod
    headless: true,
    trace: "on-first-retry",
  },

  // API testleri için proje ayarları
  projects: [
    {
      name: "api-tests",
      use: {
        // API testleri için özel ayarlar
        baseURL: "https://petstore.swagger.io/v2",
      },
    },
  ],
});
