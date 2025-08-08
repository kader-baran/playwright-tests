import { Page, Locator, expect } from '@playwright/test';

export class NotificationsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly successButton: Locator;
  readonly infoButton: Locator;
  readonly primaryButton: Locator;
  readonly errorButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Notification Demo")');
    this.successButton = page.locator('button:has-text("Success Message")');
    this.infoButton = page.locator('button:has-text("Info Message")');
    this.primaryButton = page.locator('button:has-text("Primary Message")');
    this.errorButton = page.locator('button:has-text("Error Message")');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }

  async clickAllNotificationButtons() {
    await expect(this.successButton).toBeVisible();
    await this.successButton.click();

    await expect(this.infoButton).toBeVisible();
    await this.infoButton.click();

    await expect(this.primaryButton).toBeVisible();
    await this.primaryButton.click();

    await expect(this.errorButton).toBeVisible();
    await this.errorButton.click();
  }
} 