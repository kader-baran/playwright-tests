import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "../tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",

  // Frontend testleri için timeout ayarları
  timeout: 60000,
  expect: {
    timeout: 15000,
  },

  use: {
    // Test edilecek sitenin base URL'i
    baseURL: "https://the-internet.herokuapp.com",
    headless: false,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    // Browser ayarları
    launchOptions: {
      slowMo: 500,
      devtools: false,
    },

    // Browser context ayarları
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,

    // Timeout ayarları
    actionTimeout: 20000,
    navigationTimeout: 30000,
  },

  // Sadece Chromium browser'ı için proje
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=VizDisplayCompositor",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
          ],
        },
      },
    },
  ],
}); 