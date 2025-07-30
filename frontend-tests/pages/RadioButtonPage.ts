import { Page, Locator, expect } from '@playwright/test';

export class RadioButtonPage {
  readonly page: Page;
  readonly radioButtonMenu: Locator;
  readonly yesRadioLabel: Locator;
  readonly noRadioLabel: Locator;
  readonly impressiveRadioLabel: Locator;
  readonly noRadioInput: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.radioButtonMenu = page.getByRole('listitem').filter({ hasText: 'Radio Button' });
    this.yesRadioLabel = page.locator('label[for="yesRadio"]');
    this.noRadioLabel = page.locator('label[for="noRadio"]');
    this.impressiveRadioLabel = page.locator('label[for="impressiveRadio"]');
    this.noRadioInput = page.getByLabel('No');
    this.successMessage = page.locator('.text-success');
  }

  async clickRadioButtonMenu() {
    await expect(this.radioButtonMenu).toBeVisible();
    await this.radioButtonMenu.click();
    await expect(this.page).toHaveURL(/\/radio-button$/);
  }

  async selectYesRadio() {
    await expect(this.yesRadioLabel).toBeVisible();
    await this.yesRadioLabel.click();
    await expect(this.successMessage).toHaveText('Yes');
  }

  async selectImpressiveRadio() {
    await expect(this.impressiveRadioLabel).toBeVisible();
    await this.impressiveRadioLabel.click();
    await expect(this.successMessage).toHaveText('Impressive');
  }

  async verifyNoRadioDisabled() {
    await expect(this.noRadioInput).toBeDisabled();
  }
} 