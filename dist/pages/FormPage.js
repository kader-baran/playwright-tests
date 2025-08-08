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
exports.FormPage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class FormPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.locator('h1:has-text("Input Form Validations")');
        this.firstNameInput = page.locator("#firstname");
        this.middleNameInput = page.locator("#middlename");
        this.lastNameInput = page.locator("#lastname");
        this.emailInput = page.locator("#email");
        this.passwordInput = page.locator("#password");
        this.addressInput = page.locator("#address");
        this.cityInput = page.locator("#city");
        this.stateInput = page.locator("#states");
        this.pinCodeInput = page.locator("#pincode");
        this.submitButton = page.locator('button[type="submit"]');
        this.successMessage = page.locator("text=Form submitted successfully");
    }
    verifyPageLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.pageTitle).toBeVisible();
        });
    }
    fillForm(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.firstNameInput).toBeVisible();
            yield this.firstNameInput.fill(formData.firstName);
            yield (0, test_1.expect)(this.middleNameInput).toBeVisible();
            yield this.middleNameInput.fill(formData.middleName);
            yield (0, test_1.expect)(this.lastNameInput).toBeVisible();
            yield this.lastNameInput.fill(formData.lastName);
            yield (0, test_1.expect)(this.emailInput).toBeVisible();
            yield this.emailInput.fill(formData.email);
            yield (0, test_1.expect)(this.passwordInput).toBeVisible();
            yield this.passwordInput.fill(formData.password);
            yield (0, test_1.expect)(this.addressInput).toBeVisible();
            yield this.addressInput.fill(formData.address);
            yield (0, test_1.expect)(this.cityInput).toBeVisible();
            yield this.cityInput.fill(formData.city);
            yield (0, test_1.expect)(this.stateInput).toBeVisible();
            yield this.stateInput.fill(formData.state);
            yield (0, test_1.expect)(this.pinCodeInput).toBeVisible();
            yield this.pinCodeInput.fill(formData.pinCode);
        });
    }
    submitForm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.submitButton).toBeVisible();
            yield this.submitButton.click();
        });
    }
    verifyFormSubmitted() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.successMessage).toBeVisible();
        });
    }
}
exports.FormPage = FormPage;
