import { Page, Locator, expect } from '@playwright/test';

// Page Object Model (POM) örneği
export class HomePage {
<<<<<<< HEAD
<<<<<<< HEAD
=======
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

  async clickElementsCard() {
    await expect(this.elementsCard).toBeVisible();
    await this.elementsCard.click();
    await expect(this.page).toHaveURL('https://demoqa.com/elements');
  }

  async clickFormsCard() {
    await expect(this.formsCard).toBeVisible();
    await this.formsCard.click();
    await expect(this.page).toHaveURL('https://demoqa.com/forms');
  }
>>>>>>> f4d7b4e53cd1e1a94e5df4e1e905b52e0cbd1d1b
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
=======
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

  async clickElementsCard() {
    await expect(this.elementsCard).toBeVisible();
    await this.elementsCard.click();
    await expect(this.page).toHaveURL('https://demoqa.com/elements');
  }

  async clickFormsCard() {
    await expect(this.formsCard).toBeVisible();
    await this.formsCard.click();
    await expect(this.page).toHaveURL('https://demoqa.com/forms');
  }
>>>>>>> test-branch
}

