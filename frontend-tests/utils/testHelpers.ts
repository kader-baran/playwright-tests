import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Siteye gidip currentUrl kontrolü ve Elements kartına tıklama', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  // 1. currentUrl kontrolü
  await expect(page).toHaveURL('https://demoqa.com/');

  // 2. Elements kartına tıkla
  await homePage.clickElementsCard();
}); 