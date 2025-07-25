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

  logStep('Elements kartına tıklandıktan sonra /elements URL kontrol ediliyor');
  await expect(page).toHaveURL('https://demoqa.com/elements');

  logStep('Text Box elementine tıklanıyor');
  await page.click('li#item-0'); // veya: await page.click('span.text', { hasText: 'Text Box' })

  logStep('Text Box sayfası URL kontrol ediliyor');
  await expect(page).toHaveURL('https://demoqa.com/text-box');
  
}); 