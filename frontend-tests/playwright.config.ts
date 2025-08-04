import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  fullyParallel: false,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 60000,
    navigationTimeout: 60000,
    baseURL: 'https://demoqa.com',
  },
  retries: 2,
  timeout: 120000,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
}); 