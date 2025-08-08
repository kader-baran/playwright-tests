import { Page, Locator, expect } from "@playwright/test";
import { Logger } from "../utils/Logger";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    Logger.info("Wait for page load: domcontentloaded");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoPath(pathname: string) {
    Logger.info(`Navigate to path: ${pathname}`);
    await this.page.goto(pathname);
  }

  async expectVisible(locator: Locator) {
    Logger.info("Expect locator to be visible");
    await expect(locator).toBeVisible();
  }

  async click(locator: Locator) {
    Logger.info("Click on locator");
    await this.expectVisible(locator);
    await locator.click();
  }

  async type(locator: Locator, value: string) {
    Logger.info(`Type value into locator: ${value}`);
    await this.expectVisible(locator);
    await locator.fill(value);
  }
}
