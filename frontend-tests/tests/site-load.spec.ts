import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CheckboxPage } from '../pages/CheckboxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { DropdownPage } from '../pages/DropdownPage';
import { FormPage } from '../pages/FormPage';
import { WebTablePage } from '../pages/WebTablePage';
import { IframePage } from '../pages/IframePage';
import { ShadowDomPage } from '../pages/ShadowDomPage';
import { DragAndDropPage } from '../pages/DragAndDropPage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { JavaScriptAlertPage } from '../pages/JavaScriptAlertPage';
import { formTestData, searchTestData, dragAndDropTestData } from '../data/testData';

test('QA Automation Labs akış testi (POM yapısı)', async ({ page }) => {
  // Initialize Page Objects
  const homePage = new HomePage(page);
  const checkboxPage = new CheckboxPage(page);
  const radioButtonPage = new RadioButtonPage(page);
  const dropdownPage = new DropdownPage(page);
  const formPage = new FormPage(page);
  const webTablePage = new WebTablePage(page);
  const iframePage = new IframePage(page);
  const shadowDomPage = new ShadowDomPage(page);
  const dragAndDropPage = new DragAndDropPage(page);
  const notificationsPage = new NotificationsPage(page);
  const javaScriptAlertPage = new JavaScriptAlertPage(page);

  // Navigate to home page and verify
  await homePage.goto();
  await homePage.verifyPageLoaded();

  // Checkbox Section
  await homePage.navigateToCheckbox();
  await checkboxPage.verifyPageLoaded();
  await checkboxPage.clickCheckMeCheckbox();
  await checkboxPage.verifyEnableCheckboxes();
  await checkboxPage.checkAllCheckboxes();
  await checkboxPage.toggleAllCheckboxes();

  // Radio Button Section
  await homePage.navigateToRadioButton();
  await radioButtonPage.verifyPageLoaded();
  await radioButtonPage.selectRadioButton1();
  await radioButtonPage.selectAgeGroup1835();
  await radioButtonPage.showSelectedValues();
  await radioButtonPage.verifyResult();

  // Dropdown Section
  await homePage.navigateToDropdown();
  await dropdownPage.verifyPageLoaded();
  await dropdownPage.selectFruit('Apple');
  await dropdownPage.verifyFruitSelection('Apple');
  await dropdownPage.selectCountry('India');
  await dropdownPage.clickFirstSelected();

  // Form Section
  await homePage.navigateToForm();
  await formPage.verifyPageLoaded();
  await formPage.fillForm(formTestData);
  await formPage.submitForm();
  await formPage.verifyFormSubmitted();

  // Web Table Section
  await homePage.navigateToWebTable();
  await webTablePage.verifyPageLoaded();
  
  for (const searchData of searchTestData) {
    await webTablePage.searchAndVerify(searchData.searchTerm, searchData.expectedResult);
  }

  // Iframe Section
  await homePage.navigateToIframe();
  await iframePage.verifyPageLoaded();
  await iframePage.clickIframe1Button();
  await iframePage.clickIframe2Button();

  // Shadow DOM Section
  await homePage.navigateToShadowDom();
  await shadowDomPage.verifyPageLoaded();
  await shadowDomPage.verifyOutsideShadowDomText();

  // Drag and Drop Section
  await homePage.navigateToDragAndDrop();
  await dragAndDropPage.verifyPageLoaded();
  
  for (const dragData of dragAndDropTestData) {
    await dragAndDropPage.dragItemToPosition(dragData.fromIndex, dragData.toIndex);
  }

  // Notifications Section
  await homePage.navigateToNotifications();
  await notificationsPage.verifyPageLoaded();
  await notificationsPage.clickAllNotificationButtons();

  // JavaScript Alert Section
  await homePage.navigateToJavaScriptAlert();
  await javaScriptAlertPage.verifyPageLoaded();
  await javaScriptAlertPage.setupDialogHandler();
  await javaScriptAlertPage.clickShowAlert();
  await javaScriptAlertPage.clickShowConfirm();
  await javaScriptAlertPage.clickShowPrompt();
  
});
