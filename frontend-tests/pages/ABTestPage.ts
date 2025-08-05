import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ABTestPage extends BasePage {
  // Selectors
  private readonly pageHeading = 'h3';
  private readonly poweredByLink = 'a[href="http://elementalselenium.com/"]';
  private readonly getInvolvedLink = 'a:has-text("Get Involved")';
  private readonly tipsButton = 'a:has-text("Take me to the tips")';
  private readonly externalResourcesLink = 'a:has-text("External Resources")';

  constructor(page: Page) {
    super(page);
  }

  /**
   * A/B Test sayfasına git
   */
  async navigateToABTestPage() {
    await this.navigateTo('https://the-internet.herokuapp.com/abtest');
  }

  /**
   * Sayfa başlığını kontrol et
   */
  async checkPageHeading() {
    await expect(this.page.locator(this.pageHeading)).toBeVisible();
    const headingText = await this.page.locator(this.pageHeading).textContent();
    console.log(`📄 H3 başlığı: ${headingText}`);
    
    if (headingText && headingText.includes('A/B Test')) {
      console.log('✅ A/B Test başlığı doğru');
    } else {
      console.log('⚠️ A/B Test başlığı beklenenden farklı');
    }
  }

  /**
   * Powered by linkine tıkla
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
   * Sayfa içeriğini analiz et
   */
  async analyzePageContent() {
    const content = await this.page.content();
    console.log(`📄 Sayfa içeriği uzunluğu: ${content.length} karakter`);
    
    // Önemli kelimeleri kontrol et
    const importantWords = ['filter', 'dropdown', 'select'];
    for (const word of importantWords) {
      if (content.includes(word)) {
        console.log(`✅ Sayfada "${word}" kelimesi bulundu`);
      }
    }
  }

  /**
   * Sayfa elementlerini say
   */
  async countPageElements() {
    const selectCount = await this.getElementCount('select');
    const inputCount = await this.getElementCount('input');
    const filtersClassCount = await this.getElementCount('.filters');
    const filtersIdCount = await this.getElementCount('#filters');
    const filtersNameCount = await this.getElementCount('[name="filters"]');
    const divCount = await this.getElementCount('div');
    const totalElements = await this.getElementCount('*');
    
    console.log(`📦 Sayfada ${selectCount} adet select elementi bulundu`);
    console.log(`📦 Sayfada ${inputCount} adet input elementi bulundu`);
    console.log(`📦 .filters class'ı ile ${filtersClassCount} adet element bulundu`);
    console.log(`📦 #filters id'si ile ${filtersIdCount} adet element bulundu`);
    console.log(`📦 [name="filters"] ile ${filtersNameCount} adet element bulundu`);
    console.log(`📦 Sayfada ${divCount} adet div elementi bulundu`);
    console.log(`📦 Sayfada toplam ${totalElements} adet element bulundu`);
    
    return {
      select: selectCount,
      input: inputCount,
      filtersClass: filtersClassCount,
      filtersId: filtersIdCount,
      filtersName: filtersNameCount,
      div: divCount,
      total: totalElements
    };
  }
} 