import { Page, Locator, expect } from '@playwright/test';

export class TestHelper {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Rastgele string oluştur
   */
  generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Rastgele email oluştur
   */
  generateRandomEmail(): string {
    const username = this.generateRandomString(8);
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${domain}`;
  }

  /**
   * Rastgele telefon numarası oluştur
   */
  generateRandomPhone(): string {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const lineNumber = Math.floor(Math.random() * 9000) + 1000;
    return `+1${areaCode}${prefix}${lineNumber}`;
  }

  /**
   * Element'in yüklenmesini bekle
   */
  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Element'in kaybolmasını bekle
   */
  async waitForElementToDisappear(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Sayfa yüklendiğini bekle
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Network isteğinin tamamlanmasını bekle
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * DOM'un hazır olmasını bekle
   */
  async waitForDOMContentLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Element'in tıklanabilir olmasını bekle
   */
  async waitForElementToBeClickable(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeEnabled({ timeout });
  }

  /**
   * Element'in belirli metni içermesini bekle
   */
  async waitForElementToContainText(locator: Locator, text: string, timeout: number = 10000): Promise<void> {
    await expect(locator).toContainText(text, { timeout });
  }

  /**
   * Element'in belirli değere sahip olmasını bekle
   */
  async waitForElementToHaveValue(locator: Locator, value: string, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveValue(value, { timeout });
  }

  /**
   * Element'in belirli attribute'una sahip olmasını bekle
   */
  async waitForElementToHaveAttribute(locator: Locator, attribute: string, value: string, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, value, { timeout });
  }

  /**
   * Element'in belirli CSS class'ına sahip olmasını bekle
   */
  async waitForElementToHaveClass(locator: Locator, className: string, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveClass(new RegExp(className), { timeout });
  }

  /**
   * Element'in belirli CSS property'sine sahip olmasını bekle
   */
  async waitForElementToHaveCSS(locator: Locator, property: string, value: string, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveCSS(property, value, { timeout });
  }

  /**
   * Element'in görünür olmasını bekle
   */
  async waitForElementToBeVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Element'in gizli olmasını bekle
   */
  async waitForElementToBeHidden(locator: Locator, timeout: number = 10000): Promise<void> {
    await expect(locator).toBeHidden({ timeout });
  }

  /**
   * Element'in aktif olmasını bekle
   */
  async waitForElementToBeEnabled(locator: Locator, timeout: number = 10000): Promise<void> {
    await expect(locator).toBeEnabled({ timeout });
  }

  /**
   * Element'in devre dışı olmasını bekle
   */
  async waitForElementToBeDisabled(locator: Locator, timeout: number = 10000): Promise<void> {
    await expect(locator).toBeDisabled({ timeout });
  }

  /**
   * Element'in belirli sayıda olmasını bekle
   */
  async waitForElementCount(locator: Locator, count: number, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveCount(count, { timeout });
  }

  /**
   * Element'in belirli sayıdan fazla olmasını bekle
   */
  async waitForElementCountGreaterThan(locator: Locator, count: number, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveCount({ gt: count }, { timeout });
  }

  /**
   * Element'in belirli sayıdan az olmasını bekle
   */
  async waitForElementCountLessThan(locator: Locator, count: number, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveCount({ lt: count }, { timeout });
  }

  /**
   * URL'in belirli path'i içermesini bekle
   */
  async waitForURLToContain(path: string, timeout: number = 10000): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(path), { timeout });
  }

  /**
   * Sayfa başlığının belirli metni içermesini bekle
   */
  async waitForTitleToContain(title: string, timeout: number = 10000): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(title), { timeout });
  }

  /**
   * Screenshot al ve timestamp ekle
   */
  async takeScreenshotWithTimestamp(name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ path: `screenshots/${name}_${timestamp}.png` });
  }

  /**
   * Element'in screenshot'ını al
   */
  async takeElementScreenshot(locator: Locator, name: string): Promise<void> {
    await locator.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Sayfayı scroll et ve element'i görünür yap
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Sayfayı en üste scroll et
   */
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  /**
   * Sayfayı en alta scroll et
   */
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  /**
   * Belirli piksel kadar scroll et
   */
  async scrollByPixels(pixels: number): Promise<void> {
    await this.page.evaluate((pixels) => window.scrollBy(0, pixels), pixels);
  }

  /**
   * Element'e hover yap
   */
  async hoverElement(locator: Locator): Promise<void> {
    await locator.hover();
  }

  /**
   * Element'e sağ tıkla
   */
  async rightClickElement(locator: Locator): Promise<void> {
    await locator.click({ button: 'right' });
  }

  /**
   * Element'e çift tıkla
   */
  async doubleClickElement(locator: Locator): Promise<void> {
    await locator.dblclick();
  }

  /**
   * Element'e belirli tuş kombinasyonu gönder
   */
  async pressKeyOnElement(locator: Locator, key: string): Promise<void> {
    await locator.press(key);
  }

  /**
   * Element'in içeriğini temizle
   */
  async clearElement(locator: Locator): Promise<void> {
    await locator.clear();
  }

  /**
   * Element'in değerini al
   */
  async getElementValue(locator: Locator): Promise<string> {
    return await locator.inputValue();
  }

  /**
   * Element'in attribute değerini al
   */
  async getElementAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }

  /**
   * Element'in CSS property değerini al
   */
  async getElementCSSProperty(locator: Locator, property: string): Promise<string> {
    return await locator.evaluate((el, prop) => getComputedStyle(el)[prop as any], property);
  }

  /**
   * Element'e tıkla
   */
  async clickElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }
} 