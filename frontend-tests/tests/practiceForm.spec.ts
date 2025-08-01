import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';

test('DemoQA Practice Form Testi', async ({ page }) => {
  test.setTimeout(60000); // 60 saniye

  // Practice Form Page Object'ini oluştur
  const practiceFormPage = new PracticeFormPage(page);

  // Practice form sayfasına git
  await practiceFormPage.goto();

  // Form bilgilerini doldur
  await practiceFormPage.fillForm('kader', 'baran', 'kader@getmobil.com', '1234567890', 'istanbul');

  // Submit butonuna tıkla
  await practiceFormPage.submitForm();

  // Modal'ın açıldığını kontrol et
  await practiceFormPage.verifyModalOpened();

  // Modal'ı kapat
  await practiceFormPage.closeModal();

  // Modal'ın kapandığını kontrol et
  await practiceFormPage.verifyModalClosed();
}); 








