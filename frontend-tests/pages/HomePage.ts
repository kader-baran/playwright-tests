import { Page, Locator, expect } from '@playwright/test';

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
}

