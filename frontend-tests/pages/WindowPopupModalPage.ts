import { Page, Locator, expect } from '@playwright/test';

export class WindowPopupModalPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly successModalPopup: Locator;
  readonly modalOpenedText: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Window Popup Modal Demo")');
    this.successModalPopup = page.locator('button:has-text("Success Modal")');
    this.modalOpenedText = page.locator('text=Modal opened');
    this.closeButton = page.locator('button:has-text("Close")');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }

  async clickSuccessModal() {
    await expect(this.successModalPopup).toBeVisible();
    await this.successModalPopup.click();
  }

  async verifyModalOpened() {
    await expect(this.modalOpenedText).toBeVisible();
  }

  async closeModal() {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
  }

  async verifyModalClosed() {
    await expect(this.modalOpenedText).not.toBeVisible();
  }
} 