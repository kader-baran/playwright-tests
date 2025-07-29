import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  
  // Debug modu için timeout ayarları
  timeout: 30000,
  expect: {
    timeout: 10000,
  },

  use: {
    baseURL: 'https://demoqa.com',
    headless: false,
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
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

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
  ],
});
