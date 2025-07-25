import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { logStep } from '../utils/logger'; 

test('Siteye gidip currentUrl kontrolü ve Elements kartına tıklama', async ({ page }) => {
  const homePage = new HomePage(page);

  logStep('Ana sayfaya gidiliyor');
  await homePage.goto();

  logStep('Current URL kontrol ediliyor');
  await homePage.expectOnHomePage();

  logStep('Elements kartına tıklanıyor');
  await homePage.clickElementsCard();
}); 