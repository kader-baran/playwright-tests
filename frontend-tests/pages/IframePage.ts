import { Page, Locator, expect, FrameLocator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class IframePage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly iframe1: FrameLocator;
  readonly iframe2: FrameLocator;

  constructor(page: Page) {
    super(page);
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
    await expect(
      this.page.locator("text=You have clicked on iframe 1 button")
    ).toBeVisible();
  }

  async clickIframe2Button() {
    const clickMeButton = this.iframe2.locator('button:has-text("Click Me")');
    await expect(clickMeButton).toBeVisible();
    await clickMeButton.click();
    await expect(
      this.page.locator("text=You have clicked on iframe 2 button")
    ).toBeVisible();
  }
}
