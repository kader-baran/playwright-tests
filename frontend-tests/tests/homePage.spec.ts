import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TextBoxPage } from '../pages/TextBoxPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { ButtonsPage } from '../pages/ButtonsPage';
import { LinksPage } from '../pages/LinksPage';
import { BrokenLinksPage } from '../pages/BrokenLinksPage';

test.describe('DemoQA Test Suite', () => {
  let homePage: HomePage;
  let textBoxPage: TextBoxPage;
  let checkBoxPage: CheckBoxPage;
  let radioButtonPage: RadioButtonPage;
  let webTablesPage: WebTablesPage;
  let buttonsPage: ButtonsPage;
  let linksPage: LinksPage;
  let brokenLinksPage: BrokenLinksPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    textBoxPage = new TextBoxPage(page);
    checkBoxPage = new CheckBoxPage(page);
    radioButtonPage = new RadioButtonPage(page);
    webTablesPage = new WebTablesPage(page);
    buttonsPage = new ButtonsPage(page);
    linksPage = new LinksPage(page);
    brokenLinksPage = new BrokenLinksPage(page);
  });

  test('Ana Sayfa Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    // Ana sayfaya git
    await homePage.goto();
    
    // Ana sayfa içeriğinin görünür olduğunu kontrol et
    const firstCard = page.locator('.card').first();
    await expect(firstCard).toBeVisible();
    
    // Elements kartını bul ve tıkla
    await homePage.clickElementsCard();
  });

  test('Text Box Form Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    // Ana sayfaya git ve Elements'e geç
    await homePage.goto();
    await homePage.clickElementsCard();
    
    // Text Box menüsüne tıkla
    await textBoxPage.clickTextBoxMenu();
    
    // Form alanlarını doldur
    await textBoxPage.fillForm('kader', 'kader@getmobil.com', 'istanbul', 'kocaeli');
    
    // Submit butonuna tıkla
    await textBoxPage.submitForm();
    
    // Girilen bilgilerin görüntülendiğini kontrol et
    await textBoxPage.verifyOutput('kader', 'kader@getmobil.com', 'istanbul', 'kocaeli');
  });

  test('Check Box Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    // Ana sayfaya git ve Elements'e geç
    await homePage.goto();
    await homePage.clickElementsCard();
    
    // Check Box menüsüne tıkla
    await checkBoxPage.clickCheckBoxMenu();

    // Home checkbox'ını seç
    await checkBoxPage.selectHomeCheckbox();
    await checkBoxPage.verifyResultContains('home');

    // Alt seçenekleri genişlet
    await checkBoxPage.expandAll();

    // Alt kutucukların seçili olduğunu kontrol et
    await checkBoxPage.verifySubCheckboxesAfterHomeSelection();

    // Home checkbox'ının seçimini kaldır
    await checkBoxPage.unselectHomeCheckbox();
    await checkBoxPage.verifySubCheckboxesAfterHomeUnselection();

    // Desktop checkbox'ını seç
    await checkBoxPage.selectDesktopCheckbox();
    await checkBoxPage.verifyResultContains('desktop');

    // Alt kutucukları kontrol et
    await checkBoxPage.verifyDesktopSubCheckboxes();

    // Desktop checkbox'ının seçimini kaldır
    await checkBoxPage.unselectDesktopCheckbox();
    await checkBoxPage.verifyDesktopSubCheckboxesUnselected();
    
    // Documents checkbox testi
    await checkBoxPage.selectDocumentsCheckbox();
    await checkBoxPage.verifyDocumentsSubCheckboxes();
    await checkBoxPage.unselectDocumentsCheckbox();
    await checkBoxPage.verifyDocumentsSubCheckboxesUnselected();

    // Downloads checkbox testi
    await checkBoxPage.selectDownloadsCheckbox();
    await checkBoxPage.verifyDownloadsSubCheckboxes();
    await checkBoxPage.unselectDownloadsCheckbox();
    await checkBoxPage.verifyDownloadsSubCheckboxesUnselected();

    // Alt seçenekleri gizle
    await checkBoxPage.collapseAll();
  });

  test('Radio Button Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    // Ana sayfaya git ve Elements'e geç
    await homePage.goto();
    await homePage.clickElementsCard();
    
    // Radio Button menüsüne tıkla
    await radioButtonPage.clickRadioButtonMenu();

    // Yes butonuna tıkla
    await radioButtonPage.selectYesRadio();

    // No butonunun pasif olduğunu kontrol et
    await radioButtonPage.verifyNoRadioDisabled();

    // Impressive butonuna tıkla
    await radioButtonPage.selectImpressiveRadio();
  });

  test('Web Tables Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    // Ana sayfaya git ve Elements'e geç
    await homePage.goto();
    await homePage.clickElementsCard();
    
    // Web Tables menüsüne tıkla
    await webTablesPage.clickWebTablesMenu();

    // Kayıtlı kişilerin görünür olduğunu kontrol et
    await webTablesPage.verifyDefaultRecords();

    // Add butonuna tıkla
    await webTablesPage.clickAddButton();

    // Kişi bilgilerini doldur ve submit et
    await webTablesPage.fillPersonForm('kader', 'baran', 'kader@getmobil.com', '22', '100', 'software');
    await webTablesPage.submitPersonForm();
    await webTablesPage.verifyPersonInTable('kader', 'baran', 'kader@getmobil.com', '22', '100', 'software');

    // İkinci kişi ekle
    await webTablesPage.clickAddButton();
    await webTablesPage.fillPersonForm('fatih', 'çiçek', 'fatih@getmobil.com', '30', '500', 'software');
    await webTablesPage.submitPersonForm();
    await webTablesPage.verifyPersonInTable('fatih', 'çiçek', 'fatih@getmobil.com', '30', '500', 'software');

    // Arama yap
    await webTablesPage.searchPerson('kader');
  });

  test('Buttons Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    // Ana sayfaya git ve Elements'e geç
    await homePage.goto();
    await homePage.clickElementsCard();
    
    // Buttons menüsüne tıkla
    await buttonsPage.clickButtonsMenu();

    // Double click test
    await buttonsPage.performDoubleClick();

    // Right click test
    await buttonsPage.performRightClick();

    // Click me test
    await buttonsPage.performDynamicClick();
  });

  test('Links Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    // Ana sayfaya git ve Elements'e geç
    await homePage.goto();
    await homePage.clickElementsCard();
    
    // Links menüsüne tıkla
    await linksPage.clickLinksMenu();

    // Home link test
    await linksPage.clickSimpleLink();

    // Dynamic link test
    await linksPage.clickDynamicLink();

    // API link testleri
    await linksPage.clickCreatedLink();
    await linksPage.clickNoContentLink();
    await linksPage.clickMovedLink();
  });

  test('Broken Links - Images Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    // Ana sayfaya git ve Elements'e geç
    await homePage.goto();
    await homePage.clickElementsCard();
    
    // Broken Links menüsüne tıkla
    await brokenLinksPage.clickBrokenLinksMenu();

    // Image testleri
    await brokenLinksPage.verifyValidImage();
    await brokenLinksPage.countImages();
    await brokenLinksPage.verifyBrokenImage();

    // Valid link test
    await brokenLinksPage.clickValidLink();

    // Broken link test
    await brokenLinksPage.testBrokenLink();
  });
});
 
import { logStep } from '../utils/logger'; 

test('Siteye gidip currentUrl kontrolü ve Elements kartına tıklama', async ({ page }) => {
  const homePage = new HomePage(page);

  logStep('Ana sayfaya gidiliyor');
  await homePage.goto();

  logStep('Current URL kontrol ediliyor');
  await homePage.expectOnHomePage();

  logStep('Elements kartına tıklanıyor');
  await homePage.clickElementsCard();

  logStep('Elements kartına tıklandıktan sonra /elements URL kontrol ediliyor');
  await expect(page).toHaveURL('https://demoqa.com/elements');

  logStep('Text Box elementine tıklanıyor');
  await page.click('li#item-0'); // veya: await page.click('span.text', { hasText: 'Text Box' })

  logStep('Text Box sayfası URL kontrol ediliyor');
  await expect(page).toHaveURL('https://demoqa.com/text-box');
  
  logStep('Text Box başlığı görünüyor mu kontrol ediliyor');
  await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

  logStep('Full Name alanına "kader" giriliyor ve kontrol ediliyor');
  await page.fill('#userName', 'kader');
  await expect(page.locator('#userName')).toHaveValue('kader');

  logStep('Email alanına "kader@getmobil.com" giriliyor ve kontrol ediliyor');
  await page.fill('#userEmail', 'kader@getmobil.com');
  await expect(page.locator('#userEmail')).toHaveValue('kader@getmobil.com');

  logStep('Permanent Address alanına "permanent address" giriliyor ve kontrol ediliyor');
  await page.fill('#permanentAddress', 'permanent address');
  await expect(page.locator('#permanentAddress')).toHaveValue('permanent address');

  logStep('Check Box elementine tıklanıyor ve başlık kontrol ediliyor');
  await page.click('li#item-1');
  await expect(page.getByRole('heading', { name: 'Check Box' })).toBeVisible();

  logStep('Home kartına tıklanıyor ve "You have selected :" ifadesi kontrol ediliyor');
  await page.locator('span.rct-title', { hasText: 'Home' }).click();
  await expect(page.locator('.text-success')).toContainText('You have selected');

  logStep('+ butonuna tıklanıyor ve yeni kartlar ekleniyor mu kontrol ediliyor');
  await page.click('button[title="Expand all"]');
  await expect(page.locator('span.rct-title', { hasText: 'Desktop' })).toBeVisible();
  await expect(page.locator('span.rct-title', { hasText: 'Documents' })).toBeVisible();
  await expect(page.locator('span.rct-title', { hasText: 'Downloads' })).toBeVisible();

  logStep('- butonuna tıklanıyor ve alt kartlar siliniyor mu kontrol ediliyor');
  await page.click('button[title="Collapse all"]');
  await expect(page.locator('span.rct-title', { hasText: 'Desktop' })).not.toBeVisible();
  await expect(page.locator('span.rct-title', { hasText: 'Documents' })).not.toBeVisible();
  await expect(page.locator('span.rct-title', { hasText: 'Downloads' })).not.toBeVisible();

  logStep('Radio Button elementine tıklanıyor ve URL kontrol ediliyor');
  await page.click('li#item-2');
  await expect(page).toHaveURL('https://demoqa.com/radio-button');

  logStep('Radio Button başlığı görünüyor mu kontrol ediliyor');
  await expect(page.getByRole('heading', { name: 'Radio Button' })).toBeVisible();

  logStep('Yes radio buttona tıklanıyor ve sonuç kontrol ediliyor');
  await page.click('label[for="yesRadio"]');
  await expect(page.locator('.text-success')).toHaveText('Yes');

  logStep('Impressive radio buttona tıklanıyor ve sonuç kontrol ediliyor');
  await page.click('label[for="impressiveRadio"]');
  await expect(page.locator('.text-success')).toHaveText('Impressive');

  logStep('No radio buttonunun pasif olduğu kontrol ediliyor');
  await expect(page.locator('#noRadio')).toBeDisabled();
}); 

// radio buttona tıklanınca https://demoqa.com/radio-button bu adrese gidiyor mu kontrol edeceğim
//ekranda radio button yazısı görünüyor mu kontrol edeceğim 
//yes radio buttona tıklanınca ekranda "You have selected Yes" yazısı görünüyor mu kontrol edeceğim
//impressive radio buttona tıklanınca ekranda "You have selected Impressive" yazısı görünüyor mu kontrol edeceğim
//no radio buttonu pasif olmalı. bunu kontrol edeceğim

