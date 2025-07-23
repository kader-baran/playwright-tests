import { test, expect } from '@playwright/test';

test('Form basariyla doldurulur ve dogrulanir', async ({ page }) => {
  // 1. Sayfaya git
  await page.goto('https://demoqa.com/text-box');

  // 2. Formu doldur
  await page.locator('#userName').fill('Kader Baran');
  await page.locator('#userEmail').fill('kader@example.com');
  await page.locator('#currentAddress').fill('Istanbul, Turkiye');
  await page.locator('#permanentAddress').fill('Kocaeli, Turkiye');

  // 3. Submit butonuna bas
  await page.locator('#submit').click();

  // 4. Sonuçları doğrula
  await expect(page.locator('#output')).toBeVisible();
  await expect(page.locator('#name')).toContainText('Kader Baran');
  await expect(page.locator('#email')).toContainText('kader@example.com');
});

test('Form hatali email ile doldurulursa hata verilir mi', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
  
    await page.locator('#userName').fill('Mehmet Can');
    await page.locator('#userEmail').fill('mehmet@wrong'); // geçersiz email
    await page.locator('#currentAddress').fill('');
    await page.locator('#permanentAddress').fill('Izmir, Turkiye');
  
    await page.locator('#submit').click();
  
    // Beklenen: Email alanı hatalıysa kırmızı class içermeli
    const emailInput = page.locator('#userEmail');
    await expect(emailInput).toHaveClass(/field-error/); // sayfa bu classı kullanıyorsa
  });
  
  