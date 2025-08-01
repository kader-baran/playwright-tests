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
    await this.page.goto('https://demoqa.com/');
  }

  async getTitle() {
    return this.page.title();
  }

  // Ana sayfada olduğundan emin ol (currentUrl kontrolü)
  async expectOnHomePage() {
    await this.page.waitForURL('https://demoqa.com/');
  }

  async clickElementsCard() {
    await expect(this.elementsCard).toBeVisible();
    
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
    
    await this.elementsCard.click();
    await expect(this.page).toHaveURL('https://demoqa.com/elements');
    
    // Sayfa tamamen yüklenmesini bekle
    await this.page.waitForLoadState('networkidle', { timeout: 20000 });
    
    // Sayfa yüklenmesi için ek bekleme
    await this.page.waitForTimeout(2000);
  }

  async clickFormsCard() {
    await expect(this.formsCard).toBeVisible();
    await this.formsCard.click();
    await expect(this.page).toHaveURL('https://demoqa.com/forms');
  }
}

