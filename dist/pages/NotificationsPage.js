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
exports.NotificationsPage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class NotificationsPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.locator('h1:has-text("Notification Demo")');
        this.successButton = page.locator('button:has-text("Success Message")');
        this.infoButton = page.locator('button:has-text("Info Message")');
        this.primaryButton = page.locator('button:has-text("Primary Message")');
        this.errorButton = page.locator('button:has-text("Error Message")');
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.pageTitle).toBeVisible();
        });
    }
    clickAllNotificationButtons() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.successButton).toBeVisible();
            yield this.successButton.click();
            yield (0, test_1.expect)(this.infoButton).toBeVisible();
            yield this.infoButton.click();
            yield (0, test_1.expect)(this.primaryButton).toBeVisible();
            yield this.primaryButton.click();
            yield (0, test_1.expect)(this.errorButton).toBeVisible();
            yield this.errorButton.click();
        });
    }
}
exports.NotificationsPage = NotificationsPage;
