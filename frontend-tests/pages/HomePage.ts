import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly toolsDemoTitle: Locator;
  readonly checkboxMenuLink: Locator;
  readonly radioButtonMenuLink: Locator;
  readonly dropdownMenuLink: Locator;
  readonly formMenuLink: Locator;
  readonly webTableMenuLink: Locator;
  readonly iframeMenuLink: Locator;
  readonly shadowDomMenuLink: Locator;
  readonly dragAndDropMenuLink: Locator;
  readonly notificationsMenuLink: Locator;
  readonly javaScriptAlertMenuLink: Locator;
  readonly windowPopupModalMenuLink: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.toolsDemoTitle = page.locator("text=Tools Demo");
    this.checkboxMenuLink = page.locator('a.nav-link:has-text("CheckBox")');
    this.radioButtonMenuLink = page.locator(
      'a.nav-link:has-text("Radio Button")'
    );
    this.dropdownMenuLink = page.locator('a.nav-link:has-text("Dropdown")');
    this.formMenuLink = page.locator('a.nav-link:has-text("Form")');
    this.webTableMenuLink = page.locator('a.nav-link:has-text("Web Table")');
    this.iframeMenuLink = page.locator('a.nav-link:has-text("Iframe")');
    this.shadowDomMenuLink = page.locator('a.nav-link:has-text("Shadow DOM")');
    this.dragAndDropMenuLink = page.locator(
      'a.nav-link:has-text("Drag & Drop")'
    );
    this.notificationsMenuLink = page.locator(
      'a.nav-link:has-text("Notifications")'
    );
    this.javaScriptAlertMenuLink = page.locator(
      'a.nav-link:has-text("JavaScript Alert")'
    );
    this.windowPopupModalMenuLink = page.locator(
      'a.nav-link:has-text("Window Popup Modal")'
    );
  }

  async goto() {
    Logger.info("Go to Home page: /index.php");
    await this.page.goto("/index.php");
  }

  async verifyPageLoaded() {
    Logger.info("Verify Home page loaded");
    await expect(this.page).toHaveURL(/\/index\.php$/);
    await expect(this.page).toHaveTitle(/QA Automation Labs|Tools Demo/i);
    await expect(this.toolsDemoTitle).toBeVisible();
  }

  async navigateToCheckbox() {
    Logger.info("Navigate to Checkbox page from Home");
    await expect(this.checkboxMenuLink).toBeVisible();
    await this.checkboxMenuLink.click();
  }

  async navigateToRadioButton() {
    Logger.info("Navigate to Radio Button page from Home");
    await expect(this.radioButtonMenuLink).toBeVisible();
    await this.radioButtonMenuLink.click();
  }

  async navigateToDropdown() {
    Logger.info("Navigate to Dropdown page from Home");
    await expect(this.dropdownMenuLink).toBeVisible();
    await this.dropdownMenuLink.click();
  }

  async navigateToForm() {
    Logger.info("Navigate to Form page from Home");
    await expect(this.formMenuLink).toBeVisible();
    await this.formMenuLink.click();
  }

  async navigateToWebTable() {
    Logger.info("Navigate to Web Table page from Home");
    await expect(this.webTableMenuLink).toBeVisible();
    await this.webTableMenuLink.click();
  }

  async navigateToIframe() {
    Logger.info("Navigate to Iframe page from Home");
    await expect(this.iframeMenuLink).toBeVisible();
    await this.iframeMenuLink.click();
  }

  async navigateToShadowDom() {
    Logger.info("Navigate to Shadow DOM page from Home");
    await expect(this.shadowDomMenuLink).toBeVisible();
    await this.shadowDomMenuLink.click();
  }

  async navigateToDragAndDrop() {
    Logger.info("Navigate to Drag & Drop page from Home");
    await expect(this.dragAndDropMenuLink).toBeVisible();
    await this.dragAndDropMenuLink.click();
  }

  async navigateToNotifications() {
    Logger.info("Navigate to Notifications page from Home");
    await expect(this.notificationsMenuLink).toBeVisible();
    await this.notificationsMenuLink.click();
  }

  async navigateToJavaScriptAlert() {
    Logger.info("Navigate to JavaScript Alert page from Home");
    await expect(this.javaScriptAlertMenuLink).toBeVisible();
    await this.javaScriptAlertMenuLink.click();
  }

  async navigateToWindowPopupModal() {
    Logger.info("Navigate to Window Popup Modal page from Home");
    await expect(this.windowPopupModalMenuLink).toBeVisible();
    await this.windowPopupModalMenuLink.click();
  }
}
