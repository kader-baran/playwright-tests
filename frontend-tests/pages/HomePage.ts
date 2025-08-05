import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Selectors
  private readonly welcomeHeading = 'h1';
  private readonly availableExamplesHeading = 'h2';
  private readonly abTestLink = 'a[href="/abtest"]';
  private readonly addRemoveElementsLink = 'a:has-text("Add/Remove Elements")';
  private readonly poweredByLink = 'a[href="http://elementalselenium.com/"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Ana sayfaya git
   */
  async navigateToHomePage() {
    await this.navigateTo('https://the-internet.herokuapp.com/');
  }

  /**
   * Welcome başlığını kontrol et
   */
  async checkWelcomeHeading() {
    await expect(this.page.locator(this.welcomeHeading)).toBeVisible();
    await expect(this.page.locator(this.welcomeHeading)).toContainText('Welcome to the-internet');
    console.log('✅ Welcome to the-internet yazısı görünür');
  }

  /**
   * Available Examples başlığını kontrol et
   */
  async checkAvailableExamplesHeading() {
    await expect(this.page.locator(this.availableExamplesHeading)).toBeVisible();
    await expect(this.page.locator(this.availableExamplesHeading)).toContainText('Available Examples');
    console.log('✅ Available Examples yazısı görünür');
  }

  /**
   * A/B Testing linkine tıkla
   */
  async clickABTestLink() {
    await expect(this.page.locator(this.abTestLink)).toBeVisible();
    await this.page.locator(this.abTestLink).click();
    console.log('🔗 A/B Testing linkine tıklandı');
  }

  /**
   * Add/Remove Elements linkine tıkla
   */
  async clickAddRemoveElementsLink() {
    await expect(this.page.locator(this.addRemoveElementsLink)).toBeVisible();
    await this.page.locator(this.addRemoveElementsLink).click();
    console.log('🔗 Add/Remove Elements linkine tıklandı');
  }

  /**
   * Powered by linkine tıkla ve yeni sayfayı bekle
   */
  async clickPoweredByLink(): Promise<Page> {
    const isVisible = await this.isElementVisible(this.poweredByLink);
    console.log(`🔍 Powered by linki görünür mü: ${isVisible}`);
    
    if (isVisible) {
      console.log(`📍 Tıklamadan önce URL: ${this.page.url()}`);
      return await this.clickLinkAndWaitForNewPage(this.poweredByLink);
    } else {
      throw new Error('Powered by linki bulunamadı');
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
   * Ana sayfa kontrollerini yap
   */
  async performHomePageChecks() {
    await this.checkWelcomeHeading();
    await this.checkAvailableExamplesHeading();
    console.log('🎉 Ana sayfa kontrolleri başarıyla tamamlandı!');
  }
} 