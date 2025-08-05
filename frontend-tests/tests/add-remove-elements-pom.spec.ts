import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AddRemoveElementsPage } from '../pages/AddRemoveElementsPage';
import { ElementalSeleniumPage } from '../pages/ElementalSeleniumPage';

test.describe('Add/Remove Elements - POM Structure', () => {
  let homePage: HomePage;
  let addRemoveElementsPage: AddRemoveElementsPage;
  let elementalSeleniumPage: ElementalSeleniumPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    addRemoveElementsPage = new AddRemoveElementsPage(page);
    elementalSeleniumPage = new ElementalSeleniumPage(page);
  });

  test('should test Add/Remove Elements functionality with POM', async ({ page }) => {
    console.log('🚀 Add/Remove Elements POM yapısı ile başlatılıyor...');
    
    try {
      // 1. Ana sayfaya git ve kontrolleri yap
      await homePage.navigateToHomePage();
      await homePage.checkPageTitle('The Internet');
      await homePage.performHomePageChecks();
      
      // 2. Add/Remove Elements linkine tıkla
      await homePage.clickAddRemoveElementsLink();
      await addRemoveElementsPage.checkUrl('https://the-internet.herokuapp.com/add_remove_elements/');
      await addRemoveElementsPage.checkPageHeading();
      await addRemoveElementsPage.checkAddElementButton();
      
      // 3. Element ekleme ve silme işlemlerini test et
      await addRemoveElementsPage.testAddAndRemoveElements();
      
      // 4. Sayfa içeriğini kontrol et
      await addRemoveElementsPage.checkPageContent();
      
      // 5. Toplam buton sayısını kontrol et
      const totalButtonCount = await addRemoveElementsPage.getTotalButtonCount();
      console.log(`📊 Final buton sayısı: ${totalButtonCount}`);
      
      console.log('🎉 Add/Remove Elements POM yapısı başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ Add/Remove Elements POM yapısında hata:', error);
      throw error;
    }
  });

  test('should test Add/Remove Elements with Powered by link', async ({ page }) => {
    console.log('🚀 Add/Remove Elements + Powered by link testi başlatılıyor...');
    
    try {
      // 1. Ana sayfaya git
      await homePage.navigateToHomePage();
      await homePage.checkPageTitle('The Internet');
      
      // 2. Add/Remove Elements sayfasına git
      await homePage.clickAddRemoveElementsLink();
      await addRemoveElementsPage.checkPageHeading();
      
      // 3. Birkaç element ekle
      await addRemoveElementsPage.clickAddElementButton();
      await addRemoveElementsPage.clickAddElementButton();
      await addRemoveElementsPage.clickAddElementButton();
      
      // 4. Delete buton sayısını kontrol et
      let deleteCount = await addRemoveElementsPage.getDeleteButtonCount();
      console.log(`📊 Eklenen element sayısı: ${deleteCount}`);
      expect(deleteCount).toBe(3);
      
      // 5. Tüm elementleri sil
      await addRemoveElementsPage.deleteAllElements();
      
      // 6. Delete buton sayısını tekrar kontrol et
      deleteCount = await addRemoveElementsPage.getDeleteButtonCount();
      console.log(`📊 Silme sonrası element sayısı: ${deleteCount}`);
      expect(deleteCount).toBe(0);
      
      // 7. Powered by linkine tıkla
      const newPage = await addRemoveElementsPage.clickPoweredByLink();
      const newElementalSeleniumPage = ElementalSeleniumPage.createFromPage(newPage);
      await newElementalSeleniumPage.checkPageHeading();
      await newElementalSeleniumPage.checkPageContent();
      
      console.log('🎉 Add/Remove Elements + Powered by link testi başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ Add/Remove Elements + Powered by link testinde hata:', error);
      throw error;
    }
  });

  test('should test multiple element operations with POM', async ({ page }) => {
    console.log('🚀 Çoklu element işlemleri testi başlatılıyor...');
    
    try {
      // 1. Add/Remove Elements sayfasına direkt git
      await addRemoveElementsPage.navigateToAddRemoveElementsPage();
      await addRemoveElementsPage.checkPageHeading();
      
      // 2. 5 element ekle
      for (let i = 0; i < 5; i++) {
        await addRemoveElementsPage.clickAddElementButton();
        console.log(`🔘 ${i + 1}. element eklendi`);
      }
      
      // 3. Delete buton sayısını kontrol et
      let deleteCount = await addRemoveElementsPage.getDeleteButtonCount();
      console.log(`📊 Toplam element sayısı: ${deleteCount}`);
      expect(deleteCount).toBe(5);
      
      // 4. İlk 3 elementi sil
      for (let i = 0; i < 3; i++) {
        await addRemoveElementsPage.clickFirstDeleteButton();
        console.log(`🗑️ ${i + 1}. element silindi`);
      }
      
      // 5. Kalan element sayısını kontrol et
      deleteCount = await addRemoveElementsPage.getDeleteButtonCount();
      console.log(`📊 Kalan element sayısı: ${deleteCount}`);
      expect(deleteCount).toBe(2);
      
      // 6. Kalan elementleri de sil
      await addRemoveElementsPage.deleteAllElements();
      
      // 7. Final kontrol
      deleteCount = await addRemoveElementsPage.getDeleteButtonCount();
      console.log(`📊 Final element sayısı: ${deleteCount}`);
      expect(deleteCount).toBe(0);
      
      // 8. Add Element butonunun hala görünür olduğunu kontrol et
      await addRemoveElementsPage.checkAddElementButton();
      
      console.log('🎉 Çoklu element işlemleri testi başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ Çoklu element işlemleri testinde hata:', error);
      throw error;
    }
  });
}); 