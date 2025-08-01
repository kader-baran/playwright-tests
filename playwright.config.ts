import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
<<<<<<< HEAD
  testDir: './frontend-tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
=======
  testDir: './',
  fullyParallel: true, // Paralel çalışma için true
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2, // İki tarayıcı için 2 worker
  reporter: 'html',
  
  // Debug modu için timeout ayarları
  timeout: 30000,
  expect: {
    timeout: 10000,
  },

  use: {
    baseURL: 'https://demoqa.com',
    headless: true, // Headless modu aktif
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
>>>>>>> test-branch
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
<<<<<<< HEAD
=======
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
>>>>>>> test-branch
  ],
});
