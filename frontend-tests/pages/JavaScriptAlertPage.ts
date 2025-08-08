import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";

export class JavaScriptAlertPage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly showAlertButton: Locator;
  readonly showConfirmButton: Locator;
  readonly showPromptButton: Locator;
  readonly alertShownText: Locator;
  readonly confirmClickedText: Locator;
  readonly promptEnteredText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("JavaScript Alert Demo")');
    this.showAlertButton = page.locator('button:has-text("Show Alert")');
    this.showConfirmButton = page.locator('button:has-text("Show Confirm")');
    this.showPromptButton = page.locator('button:has-text("Show Prompt")');
    this.alertShownText = page.locator("text=Alert shown.");
    this.confirmClickedText = page.locator(
      "text=You clicked OK on confirm button."
    );
    this.promptEnteredText = page.locator("text=You entered: kader");
  }

  async verifyPageLoaded() {
    Logger.info("Verify JavaScript Alert page loaded");
    await expect(this.pageTitle).toBeVisible();
  }

  async setupDialogHandler() {
    Logger.info("Setup dialog handler");
    this.page.on("dialog", (dialog) => {
      Logger.info(`Alert mesajı: ${dialog.message()}`);
      if (dialog.type() === "prompt") {
        dialog.accept("kader"); // Prompt için 'kader' text'ini gir
      } else {
        dialog.accept(); // Diğer alert'ler için sadece OK
      }
    });
  }

  async clickShowAlert() {
    Logger.info("Click 'Show Alert'");
    await expect(this.showAlertButton).toBeVisible();
    await this.showAlertButton.click();
    await expect(this.alertShownText).toBeVisible();
  }

  async clickShowConfirm() {
    Logger.info("Click 'Show Confirm'");
    await expect(this.showConfirmButton).toBeVisible();
    await this.showConfirmButton.click();
    await expect(this.confirmClickedText).toBeVisible();
  }

  async clickShowPrompt() {
    Logger.info("Click 'Show Prompt'");
    await expect(this.showPromptButton).toBeVisible();
    await this.showPromptButton.click();
    await expect(this.promptEnteredText).toBeVisible();
  }
}
