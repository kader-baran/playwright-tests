import { Page, Locator, expect } from '@playwright/test';

export class IframePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly iframe1: any;
  readonly iframe2: any;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Iframe Demo")');
    this.iframe1 = page.frameLocator('iframe[name="iframe1"]');
    this.iframe2 = page.frameLocator('iframe[name="iframe2"]');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }

  async clickIframe1Button() {
    const clickMeButton = this.iframe1.locator('button:has-text("Click Me")');
    await expect(clickMeButton).toBeVisible();
    await clickMeButton.click();
    await expect(this.page.locator('text=You have clicked on iframe 1 button')).toBeVisible();
  }

  async clickIframe2Button() {
    const clickMeButton = this.iframe2.locator('button:has-text("Click Me")');
    await expect(clickMeButton).toBeVisible();
    await clickMeButton.click();
    await expect(this.page.locator('text=You have clicked on iframe 2 button')).toBeVisible();
  }
} 