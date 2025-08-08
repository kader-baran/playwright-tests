import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

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
    await expect(this.pageTitle).toBeVisible();
  }

  async searchAndVerify(searchTerm: string, expectedResult: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(searchTerm);
    await this.page.keyboard.press("Enter");
    await expect(this.page.locator(`text=${expectedResult}`)).toBeVisible();
  }
}
