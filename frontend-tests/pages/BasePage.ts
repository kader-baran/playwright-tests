import { Page, Locator, expect } from "@playwright/test";

// Tüm sayfa sınıfları için temel sınıf
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Sayfa yükleme metodları
  async goto(url: string) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    try {
      await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
      await this.page.waitForLoadState("networkidle", { timeout: 15000 });
    } catch (error) {
      // Eğer networkidle timeout olursa, sadece domcontentloaded'i bekle
      console.log("Network idle timeout, continuing with DOM loaded state");
    }
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  // URL kontrol metodları
  async expectUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async expectUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  // Sayfa başlığı metodları
  async getTitle() {
    return this.page.title();
  }

  async expectTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text));
  }

  // Element görünürlük kontrolü
  async expectElementVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectElementNotVisible(locator: Locator) {
    await expect(locator).not.toBeVisible();
  }

  // Element tıklama
  async clickElement(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  // Element metni alma
  async getElementText(locator: Locator) {
    await expect(locator).toBeVisible();
    return locator.textContent();
  }

  // Form doldurma
  async fillInput(locator: Locator, text: string) {
    await expect(locator).toBeVisible();
    await locator.fill(text);
  }

  async typeInput(locator: Locator, text: string) {
    await expect(locator).toBeVisible();
    await locator.type(text);
  }

  // Checkbox/Radio button işlemleri
  async checkElement(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.check();
  }

  async uncheckElement(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.uncheck();
  }

  async expectElementChecked(locator: Locator) {
    await expect(locator).toBeChecked();
  }

  async expectElementNotChecked(locator: Locator) {
    await expect(locator).not.toBeChecked();
  }

  // Dropdown işlemleri
  async selectOption(locator: Locator, value: string) {
    await expect(locator).toBeVisible();
    await locator.selectOption(value);
  }

  async selectOptionByLabel(locator: Locator, label: string) {
    await expect(locator).toBeVisible();
    await locator.selectOption({ label });
  }

  // Screenshot alma
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  // Sayfa scroll işlemleri
  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
  }

  // Bekleme metodları
  async waitForElement(locator: Locator, timeout = 10000) {
    await locator.waitFor({ timeout });
  }

  async waitForElementToBeVisible(locator: Locator, timeout = 10000) {
    await expect(locator).toBeVisible({ timeout });
  }

  // Hata yakalama
  async handleError(error: Error, context: string) {
    console.error(`Error in ${context}:`, error.message);
    await this.takeScreenshot(`error-${context}-${Date.now()}`);
    throw error;
  }
}
