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
exports.CheckboxPage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class CheckboxPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.locator('h1:has-text("Checkbox Demo")');
        this.checkMeCheckbox = page.locator('label:has-text("Check me") input[type="checkbox"]');
        this.checkedText = page.locator("text=Checked");
        this.enableCheckbox1 = page.locator('label:has-text("Enable Checkbox 1") input[type="checkbox"]');
        this.enableCheckbox2 = page.locator('label:has-text("Enable Checkbox 2") input[type="checkbox"]');
        this.allCheckboxes = page.locator('.myCheckbox[type="checkbox"]');
        this.checkAllButton = page.locator("#toggleBtn");
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.pageTitle).toBeVisible();
        });
    }
    clickCheckMeCheckbox() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.checkMeCheckbox).toBeVisible();
            yield this.checkMeCheckbox.check();
            yield (0, test_1.expect)(this.checkedText).toBeVisible();
        });
    }
    verifyEnableCheckboxes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.enableCheckbox1).toBeEnabled();
            yield (0, test_1.expect)(this.enableCheckbox2).toBeEnabled();
        });
    }
    checkAllCheckboxes() {
        return __awaiter(this, void 0, void 0, function* () {
            const checkboxCount = yield this.allCheckboxes.count();
            for (let i = 0; i < checkboxCount; i++) {
                const checkbox = this.allCheckboxes.nth(i);
                yield (0, test_1.expect)(checkbox).toBeEnabled();
                yield checkbox.check();
                yield (0, test_1.expect)(checkbox).toBeChecked();
            }
        });
    }
    toggleAllCheckboxes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.checkAllButton).toBeVisible();
            yield this.checkAllButton.click();
            yield this.checkAllButton.click();
            const checkboxCount = yield this.allCheckboxes.count();
            for (let i = 0; i < checkboxCount; i++) {
                yield (0, test_1.expect)(this.allCheckboxes.nth(i)).not.toBeChecked();
            }
            yield (0, test_1.expect)(this.checkAllButton).toHaveText("Check All");
        });
    }
}
exports.CheckboxPage = CheckboxPage;
