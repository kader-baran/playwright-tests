import { Page, Locator, expect } from '@playwright/test';

export class BrokenLinksPage {
  readonly page: Page;
  readonly brokenLinksMenu: Locator;
  readonly validImage: Locator;
  readonly allImages: Locator;
  readonly brokenImage: Locator;
  readonly validLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brokenLinksMenu = page.locator('li#item-6').filter({ hasText: /^Broken Links - Images$/ });
    this.validImage = page.locator('img[src*="Toolsqa_1.jpg"]');
    this.allImages = page.locator('img');
    this.brokenImage = page.locator('img[src*="Toolsqa_1.jpg"]');
    this.validLink = page.locator('a[href="http://demoqa.com"]');
  }

  async clickBrokenLinksMenu() {
    await expect(this.brokenLinksMenu).toBeVisible();
    await this.brokenLinksMenu.click();
    await expect(this.page).toHaveURL(/\/broken$/);
  }

  async verifyValidImage() {
    await expect(this.validImage).toBeVisible();
    await expect(this.validImage).toHaveAttribute('src', /Toolsqa_1\.jpg$/);
  }

  async countImages() {
    const imageCount = await this.allImages.count();
    console.log(`Sayfada ${imageCount} adet image bulundu`);
  }

  async verifyBrokenImage() {
    await expect(this.brokenImage).toBeVisible();
    await expect(this.brokenImage).toHaveAttribute('src', /Toolsqa_1\.jpg$/);
    await expect(this.brokenImage).toHaveJSProperty('naturalWidth', 0);
    await expect(this.brokenImage).toHaveJSProperty('naturalHeight', 0);
  }

  async clickValidLink() {
    await expect(this.validLink).toBeVisible();
    await expect(this.validLink).toHaveText('Click Here for Valid Link');
    await this.validLink.click();
    await expect(this.page).toHaveURL('https://demoqa.com/');
  }

  async testBrokenLink() {
    await this.page.goto('https://the-internet.herokuapp.com/status_codes/500');
    await expect(this.page).toHaveURL('https://the-internet.herokuapp.com/status_codes/500');
    await this.page.goBack();
    await expect(this.page).toHaveURL('https://demoqa.com/');
  }
} 