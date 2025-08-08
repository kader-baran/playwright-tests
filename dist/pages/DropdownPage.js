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
exports.DropdownPage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class DropdownPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.locator('h1:has-text("Dropdown Demo")');
        this.fruitDropdown = page.locator("#fruitDropdown");
        this.countryDropdown = page.locator("#countryDropdown");
        this.firstSelectedButton = page.locator('button:has-text("First Selected")');
        this.fruitResult = page.locator("#result");
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.pageTitle).toBeVisible();
        });
    }
    selectFruit(fruit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.fruitDropdown).toBeVisible();
            yield this.fruitDropdown.selectOption({ label: fruit });
        });
    }
    verifyFruitSelection(fruit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.fruitResult).toHaveText(`You selected: ${fruit}`);
        });
    }
    selectCountry(country) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.countryDropdown).toBeVisible();
            yield this.countryDropdown.selectOption({ label: country });
        });
    }
    clickFirstSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.firstSelectedButton).toBeVisible();
            yield this.firstSelectedButton.click();
        });
    }
}
exports.DropdownPage = DropdownPage;
