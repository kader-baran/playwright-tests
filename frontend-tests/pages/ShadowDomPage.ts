import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";

export class ShadowDomPage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly outsideShadowDomText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Shadow DOM Demo")');
    this.outsideShadowDomText = page.locator("text=This is outside Shadow DOM");
  }

  async verifyPageLoaded() {
    Logger.info("Verify Shadow DOM page loaded");
    await expect(this.pageTitle).toBeVisible();
  }

  async verifyOutsideShadowDomText() {
    Logger.info("Verify outside shadow DOM text is visible");
    await expect(this.outsideShadowDomText).toBeVisible();
  }
}
