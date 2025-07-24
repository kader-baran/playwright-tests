import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test('Ana sayfa yuklenmeli ve title kontrol edilmeli', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  const title = await homePage.getTitle();

  expect(title).toContain('DEMOQA'); // demoqa.com'un gerçek title'ı
});
