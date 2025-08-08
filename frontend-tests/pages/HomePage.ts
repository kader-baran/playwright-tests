import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

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
      '//a[contains(@href, "radio-button.php")]'
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
    await this.page.goto("/index.php");
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/\/index\.php$/);
    await expect(this.page).toHaveTitle(/QA Automation Labs|Tools Demo/i);
    await expect(this.toolsDemoTitle).toBeVisible();
  }

  async navigateToCheckbox() {
    await expect(this.checkboxMenuLink).toBeVisible();
    await this.checkboxMenuLink.click();
  }

  async navigateToRadioButton() {
    await expect(this.radioButtonMenuLink).toBeVisible();
    await this.radioButtonMenuLink.click();
  }

  async navigateToDropdown() {
    await expect(this.dropdownMenuLink).toBeVisible();
    await this.dropdownMenuLink.click();
  }

  async navigateToForm() {
    await expect(this.formMenuLink).toBeVisible();
    await this.formMenuLink.click();
  }

  async navigateToWebTable() {
    await expect(this.webTableMenuLink).toBeVisible();
    await this.webTableMenuLink.click();
  }

  async navigateToIframe() {
    await expect(this.iframeMenuLink).toBeVisible();
    await this.iframeMenuLink.click();
  }

  async navigateToShadowDom() {
    await expect(this.shadowDomMenuLink).toBeVisible();
    await this.shadowDomMenuLink.click();
  }

  async navigateToDragAndDrop() {
    await expect(this.dragAndDropMenuLink).toBeVisible();
    await this.dragAndDropMenuLink.click();
  }

  async navigateToNotifications() {
    await expect(this.notificationsMenuLink).toBeVisible();
    await this.notificationsMenuLink.click();
  }

  async navigateToJavaScriptAlert() {
    await expect(this.javaScriptAlertMenuLink).toBeVisible();
    await this.javaScriptAlertMenuLink.click();
  }

  async navigateToWindowPopupModal() {
    await expect(this.windowPopupModalMenuLink).toBeVisible();
    await this.windowPopupModalMenuLink.click();
  }
}
