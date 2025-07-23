import { test, expect } from 'playwright/test';

test('Anasayfa basligi dogrulanir', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Example Domain');
});
