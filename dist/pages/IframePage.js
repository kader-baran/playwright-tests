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
exports.IframePage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class IframePage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.locator('h1:has-text("Iframe Demo")');
        this.iframe1 = page.frameLocator('iframe[name="iframe1"]');
        this.iframe2 = page.frameLocator('iframe[name="iframe2"]');
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.pageTitle).toBeVisible();
        });
    }
    clickIframe1Button() {
        return __awaiter(this, void 0, void 0, function* () {
            const clickMeButton = this.iframe1.locator('button:has-text("Click Me")');
            yield (0, test_1.expect)(clickMeButton).toBeVisible();
            yield clickMeButton.click();
            yield (0, test_1.expect)(this.page.locator("text=You have clicked on iframe 1 button")).toBeVisible();
        });
    }
    clickIframe2Button() {
        return __awaiter(this, void 0, void 0, function* () {
            const clickMeButton = this.iframe2.locator('button:has-text("Click Me")');
            yield (0, test_1.expect)(clickMeButton).toBeVisible();
            yield clickMeButton.click();
            yield (0, test_1.expect)(this.page.locator("text=You have clicked on iframe 2 button")).toBeVisible();
        });
    }
}
exports.IframePage = IframePage;
