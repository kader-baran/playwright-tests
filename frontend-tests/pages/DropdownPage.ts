import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";

export class DropdownPage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly fruitDropdown: Locator;
  readonly countryDropdown: Locator;
  readonly firstSelectedButton: Locator;
  readonly fruitResult: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Dropdown Demo")');
    this.fruitDropdown = page.locator("#fruitDropdown");
    this.countryDropdown = page.locator("#countryDropdown");
    this.firstSelectedButton = page.locator(
      'button:has-text("First Selected")'
    );
    this.fruitResult = page.locator("#result");
  }

  async verifyPageLoaded() {
    Logger.info("Verify Dropdown page loaded");
    await expect(this.pageTitle).toBeVisible();
  }

  async selectFruit(fruit: string) {
    Logger.info(`Select fruit: ${fruit}`);
    await expect(this.fruitDropdown).toBeVisible();
    await this.fruitDropdown.selectOption({ label: fruit });
  }

  async verifyFruitSelection(fruit: string) {
    Logger.info(`Verify fruit selection: ${fruit}`);
    await expect(this.fruitResult).toHaveText(`You selected: ${fruit}`);
  }

  async selectCountry(country: string) {
    Logger.info(`Select country: ${country}`);
    await expect(this.countryDropdown).toBeVisible();
    await this.countryDropdown.selectOption({ label: country });
  }

  async clickFirstSelected() {
    Logger.info("Click 'First Selected' button");
    await expect(this.firstSelectedButton).toBeVisible();
    await this.firstSelectedButton.click();
  }
}
