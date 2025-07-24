import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
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
  },

  // 🔽 Sadece chromium ile test calistirmak icin:
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
