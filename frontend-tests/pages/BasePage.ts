import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Sayfaya git
   */
  async navigateTo(url: string) {
    await this.page.goto(url);
    console.log(`🌐 ${url} sayfasına gidildi`);
  }

  /**
   * Sayfa başlığını kontrol et
   */
  async checkPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
    console.log(`✅ Sayfa başlığı doğru: ${expectedTitle}`);
  }

  /**
   * Element görünür mü kontrol et
   */
  async isElementVisible(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  /**
   * Element metnini al
   */
  async getElementText(selector: string): Promise<string> {
    const element = this.page.locator(selector);
    return await element.textContent() || '';
  }

  /**
   * Element sayısını al
   */
  async getElementCount(selector: string): Promise<number> {
    const elements = this.page.locator(selector);
    return await elements.count();
  }

  /**
   * Sayfa URL'sini kontrol et
   */
  async checkUrl(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
    console.log(`✅ URL doğru: ${expectedUrl}`);
  }

  /**
   * Sayfa içeriğini kontrol et
   */
  async checkPageContent(expectedText: string) {
    const content = await this.page.content();
    if (content.includes(expectedText)) {
      console.log(`✅ Sayfada "${expectedText}" metni bulundu`);
    } else {
      console.log(`⚠️ Sayfada "${expectedText}" metni bulunamadı`);
    }
  }

  /**
   * Bekleme işlemi
   */
  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
    console.log(`⏱️ ${ms}ms beklendi`);
  }

  /**
   * Screenshot al
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
    console.log(`📸 Screenshot alındı: ${name}`);
  }

  /**
   * Yeni sayfa açılmasını bekle
   */
  async waitForNewPage(): Promise<Page> {
    const pagePromise = this.page.context().waitForEvent('page');
    return pagePromise;
  }

  /**
   * Linke tıkla ve yeni sayfayı bekle
   */
  async clickLinkAndWaitForNewPage(linkSelector: string): Promise<Page> {
    const pagePromise = this.waitForNewPage();
    await this.page.locator(linkSelector).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('networkidle');
    return newPage;
  }
} 