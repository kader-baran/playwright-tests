import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoPath(pathname: string) {
    await this.page.goto(pathname);
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async click(locator: Locator) {
    await this.expectVisible(locator);
    await locator.click();
  }

  async type(locator: Locator, value: string) {
    await this.expectVisible(locator);
    await locator.fill(value);
  }
}
