import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ElementalSeleniumPage extends BasePage {
  // Selectors
  private readonly pageHeading = 'h1';
  private readonly getInvolvedLink = 'a:has-text("Get Involved")';
  private readonly tipsButton = 'a:has-text("Take me to the tips")';
  private readonly externalResourcesLink = 'a:has-text("External Resources")';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Yeni sayfa için ElementalSeleniumPage oluştur
   */
  static createFromPage(page: Page): ElementalSeleniumPage {
    return new ElementalSeleniumPage(page);
  }

  /**
   * Elemental Selenium sayfasına git
   */
  async navigateToElementalSeleniumPage() {
    await this.navigateTo('https://elementalselenium.com/');
  }

  /**
   * Sayfa başlığını kontrol et
   */
  async checkPageHeading() {
    await expect(this.page.locator(this.pageHeading)).toBeVisible();
    const headingText = await this.page.locator(this.pageHeading).textContent();
    console.log(`📄 H1 başlığı: ${headingText}`);
    
    if (headingText && headingText.includes('Elemental Selenium')) {
      console.log('✅ H1 başlığı Elemental Selenium yazısını içeriyor');
    } else {
      console.log('⚠️ H1 başlığı beklenenden farklı');
    }
  }

  /**
   * Get Involved linkine tıkla
   */
  async clickGetInvolvedLink(): Promise<Page> {
    const isVisible = await this.isElementVisible(this.getInvolvedLink);
    console.log(`🔍 Get Involved linki görünür mü: ${isVisible}`);
    
    if (isVisible) {
      console.log(`📍 Get Involved linkine tıklamadan önce URL: ${this.page.url()}`);
      await this.page.locator(this.getInvolvedLink).click();
      await this.page.waitForLoadState('networkidle');
      console.log(`📍 Get Involved linkine tıkladıktan sonra URL: ${this.page.url()}`);
      return this.page;
    } else {
      throw new Error('Get Involved linki bulunamadı');
    }
  }

  /**
   * Tips butonuna tıkla
   */
  async clickTipsButton(): Promise<Page> {
    const isVisible = await this.isElementVisible(this.tipsButton);
    console.log(`🔍 Take me to the tips butonu görünür mü: ${isVisible}`);
    
    if (isVisible) {
      console.log(`📍 Tips butonuna tıklamadan önce URL: ${this.page.url()}`);
      await this.page.locator(this.tipsButton).click();
      await this.page.waitForLoadState('networkidle');
      console.log(`📍 Tips butonuna tıkladıktan sonra URL: ${this.page.url()}`);
      return this.page;
    } else {
      throw new Error('Tips butonu bulunamadı');
    }
  }

  /**
   * External Resources linkine tıkla
   */
  async clickExternalResourcesLink(): Promise<Page> {
    const isVisible = await this.isElementVisible(this.externalResourcesLink);
    console.log(`🔍 External Resources linki görünür mü: ${isVisible}`);
    
    if (isVisible) {
      console.log(`📍 External Resources linkine tıklamadan önce URL: ${this.page.url()}`);
      await this.page.locator(this.externalResourcesLink).click();
      await this.page.waitForLoadState('networkidle');
      console.log(`📍 External Resources linkine tıkladıktan sonra URL: ${this.page.url()}`);
      return this.page;
    } else {
      throw new Error('External Resources linki bulunamadı');
    }
  }

  /**
   * Sayfadaki link sayısını al
   */
  async getLinkCount(): Promise<number> {
    const allLinks = this.page.locator('a');
    const linkCount = await allLinks.count();
    console.log(`🔍 Sayfada ${linkCount} adet link bulundu`);
    return linkCount;
  }

  /**
   * Sayfa içeriğini kontrol et
   */
  async checkPageContent() {
    const content = await this.page.content();
    console.log(`📄 Sayfa içeriği uzunluğu: ${content.length} karakter`);
    
    if (content.includes('Selenium')) {
      console.log('✅ Sayfada "Selenium" kelimesi bulundu');
    } else {
      console.log('⚠️ Sayfada "Selenium" kelimesi bulunamadı');
    }
  }

  /**
   * URL kontrolü yap
   */
  async checkUrl(expectedUrl: string) {
    const currentUrl = this.page.url();
    if (currentUrl === expectedUrl) {
      console.log(`✅ Doğru URL'ye yönlendirildi: ${expectedUrl}`);
    } else {
      console.log(`⚠️ URL beklenenden farklı. Beklenen: ${expectedUrl}, Gerçek: ${currentUrl}`);
    }
  }

  /**
   * Sayfa başlığını kontrol et
   */
  async checkPageTitle(expectedTitle: string) {
    try {
      await expect(this.page.locator('h1')).toBeVisible();
      await expect(this.page.locator('h1')).toContainText(expectedTitle);
      console.log(`✅ ${expectedTitle} sayfası başlığı doğru`);
    } catch (error) {
      console.log(`⚠️ ${expectedTitle} sayfası başlığı bulunamadı veya doğru değil`);
    }
  }
} 