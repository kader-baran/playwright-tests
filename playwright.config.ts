import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./frontend-tests",
  fullyParallel: false, // Sadece Chrome için paralel çalışmayı kapat
  forbidOnly: !!process.env.CI,
<<<<<<< HEAD
  workers: 1, // İki tarayıcı için 2 worker
  reporter: 'html',
  
  // Debug modu için timeout ayarları
=======
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Tek worker ile sıralı çalışma
  reporter: "html",

  // Chrome için optimize edilmiş timeout ayarları
>>>>>>> 8548971d4fddb30d74cac23cf8706e107711b8fe
  timeout: 60000,
  expect: {
    timeout: 15000,
  },

  use: {
    baseURL: "https://demoqa.com",
    headless: false, // Headless modu kapalı - tarayıcıyı görebiliriz
    trace: "on-first-retry",
    screenshot: "only-on-failure",

    // Chrome için optimize edilmiş ayarlar
    launchOptions: {
      slowMo: 500, // Her işlem arasında 0.5 saniye bekle
      devtools: false, // Developer tools'u kapalı tut
    },

    // Browser context ayarları
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,

    // Chrome için optimize edilmiş timeout'lar
    actionTimeout: 20000,
    navigationTimeout: 30000,
  },

  // Sadece Chrome ile test çalıştırmak için:
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Chrome için optimize edilmiş ayarlar
        launchOptions: {
          args: [
<<<<<<< HEAD
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ]
        }
      },
    },
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     // Firefox için ek ayarlar
    //     launchOptions: {
    //       args: [
    //         '--no-sandbox',
    //         '--disable-setuid-sandbox'
    //       ]
    //     }
    //   },
    // },
=======
            "--disable-web-security",
            "--disable-features=VizDisplayCompositor",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-renderer-backgrounding",
          ],
        },
      },
    },
>>>>>>> 8548971d4fddb30d74cac23cf8706e107711b8fe
  ],
});
