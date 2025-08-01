import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './frontend-tests',
  fullyParallel: true, // Paralel çalışma için true
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2, // İki tarayıcı için 2 worker
  reporter: 'html',
  
  // Debug modu için timeout ayarları
  timeout: 60000,
  expect: {
    timeout: 15000,
  },

  use: {
    baseURL: 'https://demoqa.com',
    headless: false, // Headless modu aktif
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    
    // Debug modu için ek ayarlar
    launchOptions: {
      slowMo: 1000, // Her işlem arasında 1 saniye bekle
      devtools: true, // Developer tools'u aç
    },
    
    // Browser context ayarları
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Tarayıcının kapanmasını önlemek için
    actionTimeout: 15000,
    navigationTimeout: 60000,
  },

  // 🔽 Sadece chromium ile test calistirmak icin:
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Debug için ek ayarlar
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ]
        }
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        // Firefox için ek ayarlar
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ]
        }
      },
    },
  ],
});
