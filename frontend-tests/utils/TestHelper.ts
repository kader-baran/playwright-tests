import { Page, Locator } from '@playwright/test';

export class TestHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Element'in yüklenmesini bekle
   */
  async waitForElement(locator: Locator, timeout: number = 10000) {
    await locator.waitFor({ timeout });
    console.log(`⏳ Element beklendi: ${locator}`);
  }

  /**
   * Sayfanın tamamen yüklenmesini bekle
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    console.log('📄 Sayfa tamamen yüklendi');
  }

  /**
   * Screenshot al
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
    console.log(`📸 Screenshot alındı: ${name}`);
  }

  /**
   * Console log'larını yakala
   */
  async captureConsoleLogs() {
    const logs: string[] = [];
    this.page.on('console', msg => {
      logs.push(msg.text());
      console.log(`📝 Console: ${msg.text()}`);
    });
    return logs;
  }

  /**
   * Network hatalarını yakala
   */
  async captureNetworkErrors() {
    const errors: any[] = [];
    this.page.on('response', response => {
      if (response.status() >= 400) {
        errors.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText()
        });
        console.log(`⚠️ Network hatası: ${response.url()} - ${response.status()}`);
      }
    });
    return errors;
  }
} 