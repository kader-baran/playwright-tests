import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";

export class RadioButtonPage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly radioButton1: Locator;
  readonly ageGroup1835Label: Locator;
  readonly showSelectedValuesButton: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Radio Button Demo")');
    this.radioButton1 = page.locator(
      'input[type="radio"][value="Radio Button 1"]'
    );
    this.ageGroup1835Label = page.locator(
      '//p[contains(text(),"Select Age Group")]/following-sibling::label[2]'
    );
    this.showSelectedValuesButton = page.locator(
      'button:has-text("Show Selected Values")'
    );
    this.resultText = page.locator("#result3");
  }

  async verifyPageLoaded() {
    Logger.info("Verify Radio Button page loaded");
    await expect(this.pageTitle).toBeVisible();
  }

  async selectRadioButton1() {
    Logger.info("Select 'Radio Button 1'");
    await expect(this.radioButton1).toBeVisible();
    await this.radioButton1.check();
    await expect(this.radioButton1).toBeChecked();
  }

  async selectAgeGroup1835() {
    Logger.info("Select age group 18-35");
    await expect(this.ageGroup1835Label).toBeVisible();
    await this.ageGroup1835Label.click();
  }

  async showSelectedValues() {
    Logger.info("Click 'Show Selected Values'");
    await expect(this.showSelectedValuesButton).toBeVisible();
    await this.showSelectedValuesButton.click();
  }

  async verifyResult() {
    Logger.info("Verify selected values text");
    await expect(this.resultText).toHaveText(
      /You selected: Gender = Radio Button 1, Age Group =\s*18-35/
    );
  }
}
