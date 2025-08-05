import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddRemoveElementsPage extends BasePage {
  // Selectors
  private readonly pageHeading = 'h3';
  private readonly addElementButton = 'button:has-text("Add Element")';
  private readonly deleteButton = 'button:has-text("Delete")';
  private readonly poweredByLink = 'a[href="http://elementalselenium.com/"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Add/Remove Elements sayfasına git
   */
  async navigateToAddRemoveElementsPage() {
    await this.navigateTo('https://the-internet.herokuapp.com/add_remove_elements/');
  }

  /**
   * Sayfa başlığını kontrol et
   */
  async checkPageHeading() {
    await expect(this.page.locator(this.pageHeading)).toBeVisible();
    await expect(this.page.locator(this.pageHeading)).toContainText('Add/Remove Elements');
    console.log('✅ Add/Remove Elements sayfası başlığı doğru');
  }

  /**
   * Add Element butonunu kontrol et
   */
  async checkAddElementButton() {
    await expect(this.page.locator(this.addElementButton)).toBeVisible();
    console.log('✅ Add Element butonu görünür');
  }

  /**
   * Add Element butonuna tıkla
   */
  async clickAddElementButton() {
    await this.page.locator(this.addElementButton).click();
    console.log('🔘 Element eklendi');
  }

  /**
   * Delete butonlarının sayısını al
   */
  async getDeleteButtonCount(): Promise<number> {
    const deleteButtons = this.page.locator(this.deleteButton);
    const count = await deleteButtons.count();
    console.log(`📊 Delete butonu sayısı: ${count}`);
    return count;
  }

  /**
   * İlk Delete butonuna tıkla
   */
  async clickFirstDeleteButton() {
    const deleteButtons = this.page.locator(this.deleteButton);
    const firstButton = deleteButtons.first();
    await firstButton.click();
    console.log('🗑️ İlk Delete butonuna tıklandı');
  }

  /**
   * Tüm Delete butonlarını sil
   */
  async deleteAllElements() {
    const deleteButtons = this.page.locator(this.deleteButton);
    const count = await deleteButtons.count();
    
    for (let i = 0; i < count; i++) {
      const firstButton = deleteButtons.first();
      await firstButton.click();
      console.log(`🗑️ ${i + 1}. Delete butonuna tıklandı`);
    }
  }

  /**
   * Sayfadaki toplam buton sayısını al
   */
  async getTotalButtonCount(): Promise<number> {
    const allButtons = this.page.locator('button');
    const count = await allButtons.count();
    console.log(`📊 Sayfadaki toplam buton sayısı: ${count}`);
    return count;
  }

  /**
   * Sayfa içeriğini kontrol et
   */
  async checkPageContent() {
    const content = await this.page.content();
    console.log(`📄 Sayfa içeriği uzunluğu: ${content.length} karakter`);
    
    // Önemli kelimeleri kontrol et
    const importantWords = ['Add Element', 'Delete'];
    for (const word of importantWords) {
      if (content.includes(word)) {
        console.log(`✅ Sayfada "${word}" yazısı bulundu`);
      } else {
        console.log(`⚠️ Sayfada "${word}" yazısı bulunamadı`);
      }
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
   * Element ekleme ve silme işlemlerini test et
   */
  async testAddAndRemoveElements() {
    // İlk element ekle
    await this.clickAddElementButton();
    
    // Delete butonunun görünür olduğunu kontrol et
    await expect(this.page.locator(this.deleteButton)).toBeVisible();
    console.log('✅ Delete butonu görünür');
    
    // Delete buton sayısını kontrol et
    let deleteCount = await this.getDeleteButtonCount();
    expect(deleteCount).toBe(1);
    
    // İkinci element ekle
    await this.clickAddElementButton();
    
    // Delete buton sayısını tekrar kontrol et
    deleteCount = await this.getDeleteButtonCount();
    expect(deleteCount).toBe(2);
    
    // İlk Delete butonunu sil
    await this.clickFirstDeleteButton();
    
    // Delete buton sayısının azaldığını kontrol et
    deleteCount = await this.getDeleteButtonCount();
    expect(deleteCount).toBe(1);
    
    // Kalan Delete butonunu sil
    await this.clickFirstDeleteButton();
    
    // Tüm Delete butonlarının silindiğini kontrol et
    deleteCount = await this.getDeleteButtonCount();
    expect(deleteCount).toBe(0);
    
    // Add Element butonunun hala görünür olduğunu kontrol et
    await expect(this.page.locator(this.addElementButton)).toBeVisible();
    console.log('✅ Add Element butonu hala görünür');
    
    console.log('🎉 Add/Remove Elements testi başarıyla tamamlandı!');
  }
} 