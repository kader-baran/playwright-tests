"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importDefault(require("../fixtures/test"));
const testData_1 = require("../data/testData");
(0, test_1.default)("QA Automation Labs akış testi (POM yapısı)", (_a) => __awaiter(void 0, [_a], void 0, function* ({ homePage, checkboxPage, radioButtonPage, dropdownPage, formPage, webTablePage, iframePage, shadowDomPage, dragAndDropPage, notificationsPage, javaScriptAlertPage, }) {
    // Navigate to home page and verify
    yield homePage.goto();
    yield homePage.verifyPageLoaded();
    // Checkbox Section
    yield homePage.navigateToCheckbox();
    yield checkboxPage.verifyPageLoaded();
    yield checkboxPage.clickCheckMeCheckbox();
    yield checkboxPage.verifyEnableCheckboxes();
    yield checkboxPage.checkAllCheckboxes();
    yield checkboxPage.toggleAllCheckboxes();
    // Radio Button Section
    yield homePage.navigateToRadioButton();
    yield radioButtonPage.verifyPageLoaded();
    yield radioButtonPage.selectRadioButton1();
    yield radioButtonPage.selectAgeGroup1835();
    yield radioButtonPage.showSelectedValues();
    yield radioButtonPage.verifyResult();
    // Dropdown Section
    yield homePage.navigateToDropdown();
    yield dropdownPage.verifyPageLoaded();
    yield dropdownPage.selectFruit("Apple");
    yield dropdownPage.verifyFruitSelection("Apple");
    yield dropdownPage.selectCountry("India");
    yield dropdownPage.clickFirstSelected();
    // Form Section
    yield homePage.navigateToForm();
    yield formPage.verifyPageLoaded();
    yield formPage.fillForm(testData_1.formTestData);
    yield formPage.submitForm();
    yield formPage.verifyFormSubmitted();
    // Web Table Section
    yield homePage.navigateToWebTable();
    yield webTablePage.verifyPageLoaded();
    for (const searchData of testData_1.searchTestData) {
        yield webTablePage.searchAndVerify(searchData.searchTerm, searchData.expectedResult);
    }
    // Iframe Section
    yield homePage.navigateToIframe();
    yield iframePage.verifyPageLoaded();
    yield iframePage.clickIframe1Button();
    yield iframePage.clickIframe2Button();
    // Shadow DOM Section
    yield homePage.navigateToShadowDom();
    yield shadowDomPage.verifyPageLoaded();
    yield shadowDomPage.verifyOutsideShadowDomText();
    // Drag and Drop Section
    yield homePage.navigateToDragAndDrop();
    yield dragAndDropPage.verifyPageLoaded();
    for (const dragData of testData_1.dragAndDropTestData) {
        yield dragAndDropPage.dragItemToPosition(dragData.fromIndex, dragData.toIndex);
    }
    // Notifications Section
    yield homePage.navigateToNotifications();
    yield notificationsPage.verifyPageLoaded();
    yield notificationsPage.clickAllNotificationButtons();
    // JavaScript Alert Section
    yield homePage.navigateToJavaScriptAlert();
    yield javaScriptAlertPage.verifyPageLoaded();
    yield javaScriptAlertPage.setupDialogHandler();
    yield javaScriptAlertPage.clickShowAlert();
    yield javaScriptAlertPage.clickShowConfirm();
    yield javaScriptAlertPage.clickShowPrompt();
}));
