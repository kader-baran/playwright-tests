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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class HomePage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.toolsDemoTitle = page.locator("text=Tools Demo");
        this.checkboxMenuLink = page.locator('a.nav-link:has-text("CheckBox")');
        this.radioButtonMenuLink = page.locator('//a[contains(@href, "radio-button.php")]');
        this.dropdownMenuLink = page.locator('a.nav-link:has-text("Dropdown")');
        this.formMenuLink = page.locator('a.nav-link:has-text("Form")');
        this.webTableMenuLink = page.locator('a.nav-link:has-text("Web Table")');
        this.iframeMenuLink = page.locator('a.nav-link:has-text("Iframe")');
        this.shadowDomMenuLink = page.locator('a.nav-link:has-text("Shadow DOM")');
        this.dragAndDropMenuLink = page.locator('a.nav-link:has-text("Drag & Drop")');
        this.notificationsMenuLink = page.locator('a.nav-link:has-text("Notifications")');
        this.javaScriptAlertMenuLink = page.locator('a.nav-link:has-text("JavaScript Alert")');
        this.windowPopupModalMenuLink = page.locator('a.nav-link:has-text("Window Popup Modal")');
    }
    goto() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto("/index.php");
        });
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.page).toHaveURL(/\/index\.php$/);
            yield (0, test_1.expect)(this.page).toHaveTitle(/QA Automation Labs|Tools Demo/i);
            yield (0, test_1.expect)(this.toolsDemoTitle).toBeVisible();
        });
    }
    navigateToCheckbox() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.checkboxMenuLink).toBeVisible();
            yield this.checkboxMenuLink.click();
        });
    }
    navigateToRadioButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.radioButtonMenuLink).toBeVisible();
            yield this.radioButtonMenuLink.click();
        });
    }
    navigateToDropdown() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.dropdownMenuLink).toBeVisible();
            yield this.dropdownMenuLink.click();
        });
    }
    navigateToForm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.formMenuLink).toBeVisible();
            yield this.formMenuLink.click();
        });
    }
    navigateToWebTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.webTableMenuLink).toBeVisible();
            yield this.webTableMenuLink.click();
        });
    }
    navigateToIframe() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.iframeMenuLink).toBeVisible();
            yield this.iframeMenuLink.click();
        });
    }
    navigateToShadowDom() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.shadowDomMenuLink).toBeVisible();
            yield this.shadowDomMenuLink.click();
        });
    }
    navigateToDragAndDrop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.dragAndDropMenuLink).toBeVisible();
            yield this.dragAndDropMenuLink.click();
        });
    }
    navigateToNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.notificationsMenuLink).toBeVisible();
            yield this.notificationsMenuLink.click();
        });
    }
    navigateToJavaScriptAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.javaScriptAlertMenuLink).toBeVisible();
            yield this.javaScriptAlertMenuLink.click();
        });
    }
    navigateToWindowPopupModal() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.windowPopupModalMenuLink).toBeVisible();
            yield this.windowPopupModalMenuLink.click();
        });
    }
}
exports.HomePage = HomePage;
