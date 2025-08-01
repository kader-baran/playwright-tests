import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TextBoxPage } from '../pages/TextBoxPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { ButtonsPage } from '../pages/ButtonsPage';
import { LinksPage } from '../pages/LinksPage';
import { BrokenLinksPage } from '../pages/BrokenLinksPage';
import { logStep } from '../utils/logger';

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
    
    logStep('Ana sayfaya gidiliyor');
    await homePage.goto();
    
    logStep('Ana sayfa içeriğinin görünür olduğunu kontrol ediliyor');
    const firstCard = page.locator('.card').first();
    await expect(firstCard).toBeVisible();
    
    logStep('Elements kartına tıklanıyor');
    await homePage.clickElementsCard();
  });

  test('Text Box Form Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    logStep('Ana sayfaya git ve Elements\'e geç');
    await homePage.goto();
    await homePage.clickElementsCard();
    
    logStep('Text Box menüsüne tıkla');
    await textBoxPage.clickTextBoxMenu();
    
    logStep('Form alanlarını doldur');
    await textBoxPage.fillForm('kader', 'kader@getmobil.com', 'istanbul', 'kocaeli');
    
    logStep('Submit butonuna tıkla');
    await textBoxPage.submitForm();
    
    logStep('Girilen bilgilerin görüntülendiğini kontrol et');
    await textBoxPage.verifyOutput('kader', 'kader@getmobil.com', 'istanbul', 'kocaeli');
  });

  test('Check Box Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    logStep('Ana sayfaya git ve Elements\'e geç');
    await homePage.goto();
    await homePage.clickElementsCard();
    
    logStep('Check Box menüsüne tıkla');
    await checkBoxPage.clickCheckBoxMenu();

    logStep('Home checkbox\'ını seç');
    await checkBoxPage.selectHomeCheckbox();
    await checkBoxPage.verifyResultContains('home');

    logStep('Alt seçenekleri genişlet');
    await checkBoxPage.expandAll();

    logStep('Alt kutucukların seçili olduğunu kontrol et');
    await checkBoxPage.verifySubCheckboxesAfterHomeSelection();

    logStep('Home checkbox\'ının seçimini kaldır');
    await checkBoxPage.unselectHomeCheckbox();
    await checkBoxPage.verifySubCheckboxesAfterHomeUnselection();

    logStep('Desktop checkbox\'ını seç');
    await checkBoxPage.selectDesktopCheckbox();
    await checkBoxPage.verifyResultContains('desktop');

    logStep('Alt kutucukları kontrol et');
    await checkBoxPage.verifyDesktopSubCheckboxes();

    logStep('Desktop checkbox\'ının seçimini kaldır');
    await checkBoxPage.unselectDesktopCheckbox();
    await checkBoxPage.verifyDesktopSubCheckboxesUnselected();
    
    logStep('Documents checkbox testi');
    await checkBoxPage.selectDocumentsCheckbox();
    await checkBoxPage.verifyDocumentsSubCheckboxes();
    await checkBoxPage.unselectDocumentsCheckbox();
    await checkBoxPage.verifyDocumentsSubCheckboxesUnselected();

    logStep('Downloads checkbox testi');
    await checkBoxPage.selectDownloadsCheckbox();
    await checkBoxPage.verifyDownloadsSubCheckboxes();
    await checkBoxPage.unselectDownloadsCheckbox();
    await checkBoxPage.verifyDownloadsSubCheckboxesUnselected();

    logStep('Alt seçenekleri gizle');
    await checkBoxPage.collapseAll();
  });

  test('Radio Button Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    logStep('Ana sayfaya git ve Elements\'e geç');
    await homePage.goto();
    await homePage.clickElementsCard();
    
    logStep('Radio Button menüsüne tıkla');
    await radioButtonPage.clickRadioButtonMenu();

    logStep('Yes butonuna tıkla');
    await radioButtonPage.selectYesRadio();

    logStep('No butonunun pasif olduğunu kontrol et');
    await radioButtonPage.verifyNoRadioDisabled();

    logStep('Impressive butonuna tıkla');
    await radioButtonPage.selectImpressiveRadio();
  });

  test('Web Tables Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    logStep('Ana sayfaya git ve Elements\'e geç');
    await homePage.goto();
    await homePage.clickElementsCard();
    
    logStep('Web Tables menüsüne tıkla');
    await webTablesPage.clickWebTablesMenu();

    logStep('Kayıtlı kişilerin görünür olduğunu kontrol et');
    await webTablesPage.verifyDefaultRecords();

    logStep('Add butonuna tıkla');
    await webTablesPage.clickAddButton();

    logStep('Kişi bilgilerini doldur ve submit et');
    await webTablesPage.fillPersonForm('kader', 'baran', 'kader@getmobil.com', '22', '100', 'software');
    await webTablesPage.submitPersonForm();
    await webTablesPage.verifyPersonInTable('kader', 'baran', 'kader@getmobil.com', '22', '100', 'software');

    logStep('İkinci kişi ekle');
    await webTablesPage.clickAddButton();
    await webTablesPage.fillPersonForm('fatih', 'çiçek', 'fatih@getmobil.com', '30', '500', 'software');
    await webTablesPage.submitPersonForm();
    await webTablesPage.verifyPersonInTable('fatih', 'çiçek', 'fatih@getmobil.com', '30', '500', 'software');

    logStep('Arama yap');
    await webTablesPage.searchPerson('kader');
  });

  test('Buttons Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    logStep('Ana sayfaya git ve Elements\'e geç');
    await homePage.goto();
    await homePage.clickElementsCard();
    
    logStep('Buttons menüsüne tıkla');
    await buttonsPage.clickButtonsMenu();

    logStep('Double click test');
    await buttonsPage.performDoubleClick();

    logStep('Right click test');
    await buttonsPage.performRightClick();

    logStep('Click me test');
    await buttonsPage.performDynamicClick();
  });

  test('Links Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    logStep('Ana sayfaya git ve Elements\'e geç');
    await homePage.goto();
    await homePage.clickElementsCard();
    
    logStep('Links menüsüne tıkla');
    await linksPage.clickLinksMenu();

    logStep('Home link test');
    await linksPage.clickSimpleLink();

    logStep('Dynamic link test');
    await linksPage.clickDynamicLink();

    logStep('API link testleri');
    await linksPage.clickCreatedLink();
    await linksPage.clickNoContentLink();
    await linksPage.clickMovedLink();
  });

  test('Broken Links - Images Testi', async ({ page }) => {
    test.setTimeout(60000);
    
    logStep('Ana sayfaya git ve Elements\'e geç');
    await homePage.goto();
    await homePage.clickElementsCard();
    
    logStep('Broken Links menüsüne tıkla');
    await brokenLinksPage.clickBrokenLinksMenu();

    logStep('Image testleri');
    await brokenLinksPage.verifyValidImage();
    await brokenLinksPage.countImages();
    await brokenLinksPage.verifyBrokenImage();

    logStep('Valid link test');
    await brokenLinksPage.clickValidLink();

    logStep('Broken link test');
    await brokenLinksPage.testBrokenLink();
  });

  test('Siteye gidip currentUrl kontrolü ve Elements kartına tıklama', async ({ page }) => {
    logStep('Ana sayfaya gidiliyor');
    await homePage.goto();

    logStep('Current URL kontrol ediliyor');
    await homePage.expectOnHomePage();

    logStep('Elements kartına tıklanıyor');
    await homePage.clickElementsCard();

    logStep('Elements kartına tıklandıktan sonra /elements URL kontrol ediliyor');
    await expect(page).toHaveURL('https://demoqa.com/elements');

    logStep('Text Box elementine tıklanıyor');
    await page.click('li#item-0');

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

    logStep('Home kartına tıklanıyor ve "home" ifadesi kontrol ediliyor');
    await page.locator('span.rct-title', { hasText: 'Home' }).click();
    await expect(page.locator('.text-success').first()).toContainText('home');

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
});
