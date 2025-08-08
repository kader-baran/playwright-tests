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
exports.JavaScriptAlertPage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class JavaScriptAlertPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.locator('h1:has-text("JavaScript Alert Demo")');
        this.showAlertButton = page.locator('button:has-text("Show Alert")');
        this.showConfirmButton = page.locator('button:has-text("Show Confirm")');
        this.showPromptButton = page.locator('button:has-text("Show Prompt")');
        this.alertShownText = page.locator("text=Alert shown.");
        this.confirmClickedText = page.locator("text=You clicked OK on confirm button.");
        this.promptEnteredText = page.locator("text=You entered: kader");
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.pageTitle).toBeVisible();
        });
    }
    setupDialogHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            this.page.on("dialog", (dialog) => {
                console.log(`Alert mesajı: ${dialog.message()}`);
                if (dialog.type() === "prompt") {
                    dialog.accept("kader"); // Prompt için 'kader' text'ini gir
                }
                else {
                    dialog.accept(); // Diğer alert'ler için sadece OK
                }
            });
        });
    }
    clickShowAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.showAlertButton).toBeVisible();
            yield this.showAlertButton.click();
            yield (0, test_1.expect)(this.alertShownText).toBeVisible();
        });
    }
    clickShowConfirm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.showConfirmButton).toBeVisible();
            yield this.showConfirmButton.click();
            yield (0, test_1.expect)(this.confirmClickedText).toBeVisible();
        });
    }
    clickShowPrompt() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.showPromptButton).toBeVisible();
            yield this.showPromptButton.click();
            yield (0, test_1.expect)(this.promptEnteredText).toBeVisible();
        });
    }
}
exports.JavaScriptAlertPage = JavaScriptAlertPage;
