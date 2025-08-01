import { Page, Locator, expect } from '@playwright/test';

export class TextBoxPage {
  readonly page: Page;
  readonly textBoxMenu: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly output: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textBoxMenu = page.locator('li#item-0');
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.output = page.locator('#output');
  }

  async clickTextBoxMenu() {
    // Text Box menüsünün görünür olduğunu kontrol et
    await expect(this.textBoxMenu).toBeVisible({ timeout: 10000 });
    
    // Text Box menüsüne tıkla
    await this.textBoxMenu.click();
    
    // URL'nin değiştiğini kontrol et
    await expect(this.page).toHaveURL(/\/text-box$/);
    
    // Sayfa tamamen yüklenmesini bekle
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Text Box sayfasının yüklendiğini kontrol et
    await expect(this.page.getByRole('heading', { name: 'Text Box' })).toBeVisible({ timeout: 10000 });
    
    // Form elementlerinin görünür olduğunu kontrol et
    await expect(this.fullNameInput).toBeVisible({ timeout: 10000 });
    
    // Ek güvenlik için kısa bir bekleme
    await this.page.waitForTimeout(1000);
  }

  async fillForm(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
    await expect(this.fullNameInput).toBeVisible();
    await this.fullNameInput.fill(fullName);
    await expect(this.fullNameInput).toHaveValue(fullName);

    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);

    await this.currentAddressInput.fill(currentAddress);
    await expect(this.currentAddressInput).toHaveValue(currentAddress);

    await this.permanentAddressInput.fill(permanentAddress);
    await expect(this.permanentAddressInput).toHaveValue(permanentAddress);
  }

  async submitForm() {
    await expect(this.submitButton).toBeVisible();
    await this.submitButton.click();
  }

  async verifyOutput(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
    await expect(this.output).toBeVisible();
    await expect(this.page.locator('#name')).toContainText(fullName);
    await expect(this.page.locator('#email')).toContainText(email);
    await expect(this.page.locator('p#currentAddress')).toContainText(currentAddress);
    await expect(this.page.locator('p#permanentAddress')).toContainText(permanentAddress);
  }
} 