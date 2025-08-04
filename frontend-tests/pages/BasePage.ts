import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async expectTitle(title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async expectElementVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectElementContainsText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  async clickElement(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  async fillInput(locator: Locator, text: string) {
    await expect(locator).toBeVisible();
    await locator.fill(text);
  }

  async doubleClickElement(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.dblclick();
  }

  async rightClickElement(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.click({ button: 'right' });
  }

  async scalePage(scale: number = 0.75) {
    await this.page.evaluate((scaleValue) => {
      document.body.style.transform = `scale(${scaleValue})`;
      document.body.style.transformOrigin = 'center center';
      document.body.style.display = 'flex';
      document.body.style.justifyContent = 'center';
      document.body.style.alignItems = 'center';
      document.body.style.minHeight = '100vh';
    }, scale);
  }

  async removeAds() {
    await this.page.evaluate(() => {
      // Reklam iframe'lerini kaldır
      const ads = document.querySelectorAll('iframe[src*="google"], iframe[src*="ads"], div[id*="ads"], div[class*="ads"]');
      ads.forEach(ad => ad.remove());
      
      // fixedban div'ini kaldır
      const fixedban = document.getElementById('fixedban');
      if (fixedban) fixedban.remove();
      
      // Ad-related elements'leri kaldır
      const adElements = document.querySelectorAll('[id*="google"], [class*="ads"]');
      adElements.forEach(el => el.remove());
    });
  }
} 