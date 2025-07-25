import { Page } from '@playwright/test';

// Page Object Model (POM) örneği
export class HomePage {
  readonly page: import('@playwright/test').Page;

  constructor(page: import('@playwright/test').Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demoqa.com');
  }

  async getTitle() {
    return this.page.title();
  }

  // Ana sayfada olduğundan emin ol (currentUrl kontrolü)
  async expectOnHomePage() {
    await this.page.waitForURL('https://demoqa.com/');
  }

  // 'Elements' kartına tıkla (en doğru locator ile)
  async clickElementsCard() {
    await this.page.locator('.category-cards .card:has-text("Elements")').first().click();
  }

  // Buraya sayfa ile ilgili başka metotlar eklenebilir
}
