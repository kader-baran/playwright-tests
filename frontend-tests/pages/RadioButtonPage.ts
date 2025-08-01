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
    this.radioButtonMenu = page.locator('li#item-2');
    this.yesRadioLabel = page.locator('label[for="yesRadio"]');
    this.noRadioLabel = page.locator('label[for="noRadio"]');
    this.impressiveRadioLabel = page.locator('label[for="impressiveRadio"]');
    this.noRadioInput = page.getByLabel('No');
    this.successMessage = page.locator('.text-success');
  }

  async clickRadioButtonMenu() {
    // Radio Button menüsünün görünür olduğunu kontrol et
    await expect(this.radioButtonMenu).toBeVisible({ timeout: 10000 });
    
    // Radio Button menüsüne tıkla
    await this.radioButtonMenu.click();
    
    // URL'nin değiştiğini kontrol et
    await expect(this.page).toHaveURL(/\/radio-button$/);
    
    // Sayfa tamamen yüklenmesini bekle
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Radio Button sayfasının yüklendiğini kontrol et
    await expect(this.page.getByRole('heading', { name: 'Radio Button' })).toBeVisible({ timeout: 10000 });
    
    // Radio Button elementlerinin görünür olduğunu kontrol et
    await expect(this.yesRadioLabel).toBeVisible({ timeout: 10000 });
    
    // Ek güvenlik için kısa bir bekleme
    await this.page.waitForTimeout(1000);
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