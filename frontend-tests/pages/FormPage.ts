import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FormPage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly pinCodeInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
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

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }

  async fillForm(formData: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  }) {
    await expect(this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(formData.firstName);

    await expect(this.middleNameInput).toBeVisible();
    await this.middleNameInput.fill(formData.middleName);

    await expect(this.lastNameInput).toBeVisible();
    await this.lastNameInput.fill(formData.lastName);

    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(formData.email);

    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(formData.password);

    await expect(this.addressInput).toBeVisible();
    await this.addressInput.fill(formData.address);

    await expect(this.cityInput).toBeVisible();
    await this.cityInput.fill(formData.city);

    await expect(this.stateInput).toBeVisible();
    await this.stateInput.fill(formData.state);

    await expect(this.pinCodeInput).toBeVisible();
    await this.pinCodeInput.fill(formData.pinCode);
  }

  async submitForm() {
    await expect(this.submitButton).toBeVisible();
    await this.submitButton.click();
  }

  async verifyFormSubmitted() {
    await expect(this.successMessage).toBeVisible();
  }
}
