import { Page, Locator, expect } from '@playwright/test';

// Page Object Model (POM) örneği
export class HomePage {
  readonly page: Page;
  readonly elementsCard: Locator;
  readonly formsCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementsCard = page.locator('.card-body').filter({ hasText: 'Elements' });
    this.formsCard = page.locator('.card:has-text("Forms")');
  }

  async goto() {
    // Base URL'ye git
    await this.page.goto('https://demoqa.com/');
    
    // Sayfanın tamamen yüklenmesini bekle
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    
    
    // Ana sayfa elementlerinin görünür olduğunu kontrol et
    await expect(this.page.locator('.card').first()).toBeVisible({ timeout: 10000 });
    
    // Ek güvenlik için kısa bir bekleme
    await this.page.waitForTimeout(1000);
  }

  async getTitle() {
    return this.page.title();
  }

  // Ana sayfada olduğundan emin ol (currentUrl kontrolü)
  async expectOnHomePage() {
    await this.page.waitForURL('https://demoqa.com/');
  }

  async clickElementsCard() {
    // Elements kartının görünür olduğunu kontrol et
    await expect(this.elementsCard).toBeVisible({ timeout: 10000 });
    
    // Fixed banner ve footer'ı kaldır
    await this.page.evaluate(() => {
      const fixedBanner = document.getElementById('fixedban');
      if (fixedBanner) {
        fixedBanner.remove();
      }
      
      const footer = document.querySelector('footer');
      if (footer) {
        footer.remove();
      }
    });
    
    // Elements kartına tıkla
    await this.elementsCard.click();
    
    // URL'nin değiştiğini kontrol et
    await expect(this.page).toHaveURL('https://demoqa.com/elements');
    
    // Sayfa tamamen yüklenmesini bekle
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
    
    // Elements sayfasının yüklendiğini kontrol et (sadece açık olan menü)
    await expect(this.page.locator('.element-list.collapse.show')).toBeVisible({ timeout: 10000 });
    
    // Sayfa yüklenmesi için ek bekleme
    await this.page.waitForTimeout(2000);
  }

  async clickFormsCard() {
    await expect(this.formsCard).toBeVisible();
    await this.formsCard.click();
    await expect(this.page).toHaveURL('https://demoqa.com/forms');
  }
}

