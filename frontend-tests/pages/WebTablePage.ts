import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";

export class WebTablePage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Table Demo")');
    this.searchInput = page.locator("#searchInput");
  }

  async verifyPageLoaded() {
    Logger.info("Verify Web Table page loaded");
    await expect(this.pageTitle).toBeVisible();
  }

  async searchAndVerify(searchTerm: string, expectedResult: string) {
    Logger.info(
      `Search in table: term='${searchTerm}', expect='${expectedResult}'`
    );
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(searchTerm);
    await this.page.keyboard.press("Enter");
    await expect(this.page.locator(`text=${expectedResult}`)).toBeVisible();
  }
}
