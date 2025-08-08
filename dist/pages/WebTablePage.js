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
exports.WebTablePage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class WebTablePage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.locator('h1:has-text("Table Demo")');
        this.searchInput = page.locator("#searchInput");
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.pageTitle).toBeVisible();
        });
    }
    searchAndVerify(searchTerm, expectedResult) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.searchInput).toBeVisible();
            yield this.searchInput.fill(searchTerm);
            yield this.page.keyboard.press("Enter");
            yield (0, test_1.expect)(this.page.locator(`text=${expectedResult}`)).toBeVisible();
        });
    }
}
exports.WebTablePage = WebTablePage;
