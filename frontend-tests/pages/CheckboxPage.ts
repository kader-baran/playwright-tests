import { Page, Locator, expect } from '@playwright/test';

export class CheckboxPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly checkMeCheckbox: Locator;
  readonly checkedText: Locator;
  readonly enableCheckbox1: Locator;
  readonly enableCheckbox2: Locator;
  readonly allCheckboxes: Locator;
  readonly checkAllButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Checkbox Demo")');
    this.checkMeCheckbox = page.locator('label:has-text("Check me") input[type="checkbox"]');
    this.checkedText = page.locator('text=Checked');
    this.enableCheckbox1 = page.locator('label:has-text("Enable Checkbox 1") input[type="checkbox"]');
    this.enableCheckbox2 = page.locator('label:has-text("Enable Checkbox 2") input[type="checkbox"]');
    this.allCheckboxes = page.locator('.myCheckbox[type="checkbox"]');
    this.checkAllButton = page.locator('#toggleBtn');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }

  async clickCheckMeCheckbox() {
    await expect(this.checkMeCheckbox).toBeVisible();
    await this.checkMeCheckbox.check();
    await expect(this.checkedText).toBeVisible();
  }

  async verifyEnableCheckboxes() {
    await expect(this.enableCheckbox1).toBeEnabled();
    await expect(this.enableCheckbox2).toBeEnabled();
  }

  async checkAllCheckboxes() {
    const checkboxCount = await this.allCheckboxes.count();
    for (let i = 0; i < checkboxCount; i++) {
      const checkbox = this.allCheckboxes.nth(i);
      await expect(checkbox).toBeEnabled();
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  }

  async toggleAllCheckboxes() {
    await expect(this.checkAllButton).toBeVisible();
    await this.checkAllButton.click();
    await this.checkAllButton.click();
    
    const checkboxCount = await this.allCheckboxes.count();
    for (let i = 0; i < checkboxCount; i++) {
      await expect(this.allCheckboxes.nth(i)).not.toBeChecked();
    }
    await expect(this.checkAllButton).toHaveText("Check All");
  }
} 