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
exports.RadioButtonPage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class RadioButtonPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.locator('h1:has-text("Radio Button Demo")');
        this.radioButton1 = page.locator('input[type="radio"][value="Radio Button 1"]');
        this.ageGroup1835Label = page.locator('//p[contains(text(),"Select Age Group")]/following-sibling::label[2]');
        this.showSelectedValuesButton = page.locator('button:has-text("Show Selected Values")');
        this.resultText = page.locator("#result3");
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.pageTitle).toBeVisible();
        });
    }
    selectRadioButton1() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.radioButton1).toBeVisible();
            yield this.radioButton1.check();
            yield (0, test_1.expect)(this.radioButton1).toBeChecked();
        });
    }
    selectAgeGroup1835() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.ageGroup1835Label).toBeVisible();
            yield this.ageGroup1835Label.click();
        });
    }
    showSelectedValues() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.showSelectedValuesButton).toBeVisible();
            yield this.showSelectedValuesButton.click();
        });
    }
    verifyResult() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.resultText).toHaveText(/You selected: Gender = Radio Button 1, Age Group =\s*18-35/);
        });
    }
}
exports.RadioButtonPage = RadioButtonPage;
