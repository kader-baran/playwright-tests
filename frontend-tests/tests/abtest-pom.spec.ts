import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ABTestPage } from '../pages/ABTestPage';
import { ElementalSeleniumPage } from '../pages/ElementalSeleniumPage';

test.describe('A/B Test - POM Structure', () => {
  let homePage: HomePage;
  let abTestPage: ABTestPage;
  let elementalSeleniumPage: ElementalSeleniumPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    abTestPage = new ABTestPage(page);
    elementalSeleniumPage = new ElementalSeleniumPage(page);
  });

  test('should test A/B Testing functionality with POM', async ({ page }) => {
    console.log('🚀 A/B Test POM yapısı ile başlatılıyor...');
    
    try {
      // 1. Ana sayfaya git ve kontrolleri yap
      await homePage.navigateToHomePage();
      await homePage.checkPageTitle('The Internet');
      await homePage.performHomePageChecks();
      
      // 2. A/B Testing linkine tıkla
      await homePage.clickABTestLink();
      await abTestPage.checkUrl('https://the-internet.herokuapp.com/abtest');
      await abTestPage.checkPageHeading();
      
      // 3. Powered by linkine tıkla
      const newPage = await abTestPage.clickPoweredByLink();
      const newElementalSeleniumPage = ElementalSeleniumPage.createFromPage(newPage);
      await newElementalSeleniumPage.checkPageHeading();
      await newElementalSeleniumPage.checkPageContent();
      
      // 4. Get Involved linkine tıkla
      const getInvolvedPage = await newElementalSeleniumPage.clickGetInvolvedLink();
      await newElementalSeleniumPage.checkUrl('https://elementalselenium.com/community');
      await newElementalSeleniumPage.checkPageTitle('Get Involved');
      
      // 5. Ana sayfaya geri dön ve Tips butonuna tıkla
      await newElementalSeleniumPage.navigateToElementalSeleniumPage();
      const tipsPage = await newElementalSeleniumPage.clickTipsButton();
      await newElementalSeleniumPage.checkUrl('https://elementalselenium.com/tips');
      await newElementalSeleniumPage.checkPageTitle('The Tips');
      
      // 6. Tips sayfası analizi
      await abTestPage.analyzePageContent();
      await abTestPage.countPageElements();
      
      // 7. External Resources linkine tıkla
      const externalResourcesPage = await newElementalSeleniumPage.clickExternalResourcesLink();
      await newElementalSeleniumPage.checkUrl('https://elementalselenium.com/resources');
      await newElementalSeleniumPage.checkPageTitle('External Resources');
      
      console.log('🎉 A/B Test POM yapısı başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ A/B Test POM yapısında hata:', error);
      throw error;
    }
  });

  test('should test homepage navigation with POM', async ({ page }) => {
    console.log('🚀 Ana sayfa navigasyon testi başlatılıyor...');
    
    try {
      // 1. Ana sayfaya git
      await homePage.navigateToHomePage();
      await homePage.checkPageTitle('The Internet');
      
      // 2. Sayfa kontrollerini yap
      await homePage.checkWelcomeHeading();
      await homePage.checkAvailableExamplesHeading();
      
      // 3. Link sayısını kontrol et
      const linkCount = await homePage.getLinkCount();
      console.log(`📊 Ana sayfada ${linkCount} adet link bulundu`);
      
      // 4. Powered by linkine tıkla
      const newPage = await homePage.clickPoweredByLink();
      const newElementalSeleniumPage = ElementalSeleniumPage.createFromPage(newPage);
      await newElementalSeleniumPage.checkPageHeading();
      
      console.log('🎉 Ana sayfa navigasyon testi başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ Ana sayfa navigasyon testinde hata:', error);
      throw error;
    }
  });
}); 