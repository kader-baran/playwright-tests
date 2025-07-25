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

  // Ana sayfadaki 'Elements' kartına tıkla
  async clickElementsCard() {
    await this.page.locator('div.card-body:has-text("Elements")').click();
  }

  // Buraya sayfa ile ilgili başka metotlar eklenebilir
}
