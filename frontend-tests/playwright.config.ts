import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    baseURL: 'https://demoqa.com',
  },
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
}); 