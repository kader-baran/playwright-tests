import { test, expect } from '@playwright/test';

test('DemoQA Ana Sayfa ve Text Box Form Testi', async ({ page }) => {
  // Ana sayfaya git
  await page.goto('https://demoqa.com/');
  
  // Ana sayfa içeriğinin görünür olduğunu kontrol et
  const firstCard = page.locator('.card').first();
  await expect(firstCard).toBeVisible();
  
  // Elements kartını bul ve tıkla
  const elementsCard = page.locator('.card-body').filter({ hasText: 'Elements' });
  await expect(elementsCard).toBeVisible();
  await elementsCard.click();
  
  // Elements sayfasına yönlendirildiğini kontrol et
  await expect(page).toHaveURL('https://demoqa.com/elements');
  
  // Sol menüde "Text Box" linkini bul ve tıkla
  const textBoxMenu = page.getByRole('listitem').filter({ hasText: 'Text Box' });
  await expect(textBoxMenu).toBeVisible();
  await textBoxMenu.click();
  
  // Text Box sayfasına yönlendirildiğini kontrol et
  await expect(page).toHaveURL(/\/text-box$/);
  
  // Form alanlarını doldur
  const fullNameInput = page.locator('#userName');
  await expect(fullNameInput).toBeVisible();
  await fullNameInput.fill('kader');
  await expect(fullNameInput).toHaveValue('kader');
  
  const emailInput = page.locator('#userEmail');
  await emailInput.fill('kader@getmobil.com');
  await expect(emailInput).toHaveValue('kader@getmobil.com');
  
  const currentAddressInput = page.locator('#currentAddress');
  await currentAddressInput.fill('istanbul');
  await expect(currentAddressInput).toHaveValue('istanbul');
  
  const permanentAddressInput = page.locator('#permanentAddress');
  await permanentAddressInput.fill('kocaeli');
  await expect(permanentAddressInput).toHaveValue('kocaeli');
  
  // Submit butonuna tıkla
  const submitButton = page.locator('#submit');
  await expect(submitButton).toBeVisible();
  await submitButton.click();
  
  // Girilen bilgilerin görüntülendiğini kontrol et
  await expect(page.locator('#output')).toBeVisible();
  await expect(page.locator('#name')).toContainText('kader');
  await expect(page.locator('#email')).toContainText('kader@getmobil.com');
  await expect(page.locator('p#currentAddress')).toContainText('istanbul');
  await expect(page.locator('p#permanentAddress')).toContainText('kocaeli');
});
