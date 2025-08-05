import { test as base, Page, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ElementHelper } from './ElementHelper';
import { TestDataHelper } from './TestDataHelper';
import { AssertionHelper } from './AssertionHelper';

// Test fixtures için tip tanımları
export type TestFixtures = {
  basePage: BasePage;
  elementHelper: ElementHelper;
  testDataHelper: typeof TestDataHelper;
  assertionHelper: AssertionHelper;
};

// Test base sınıfı - tüm testler için ortak fonksiyonalite
export class TestBase {
  protected page: Page;
  protected basePage: BasePage;
  protected elementHelper: ElementHelper;
  protected testDataHelper: typeof TestDataHelper;
  protected assertionHelper: AssertionHelper;

  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.elementHelper = new ElementHelper(page);
    this.testDataHelper = TestDataHelper;
    this.assertionHelper = new AssertionHelper(page);
  }

  // Test setup metodları
  async setupTest() {
    // Test başlangıcında yapılacak işlemler
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.setDefaultTimeout(30000);
    await this.page.setDefaultNavigationTimeout(30000);
  }

  async cleanupTest() {
    // Test sonunda yapılacak temizlik işlemleri
    await this.page.close();
  }

  // Sayfa navigasyon metodları
  async navigateToHomePage() {
    await this.basePage.goto('https://demoqa.com/');
    await this.basePage.waitForPageLoad();
  }

  async navigateToElementsPage() {
    await this.basePage.goto('https://demoqa.com/elements');
    await this.basePage.waitForPageLoad();
  }

  async navigateToFormsPage() {
    await this.basePage.goto('https://demoqa.com/forms');
    await this.basePage.waitForPageLoad();
  }

  async navigateToWidgetsPage() {
    await this.basePage.goto('https://demoqa.com/widgets');
    await this.basePage.waitForPageLoad();
  }

  async navigateToInteractionsPage() {
    await this.basePage.goto('https://demoqa.com/interaction');
    await this.basePage.waitForPageLoad();
  }

  // Ortak test metodları
  async takeScreenshot(name: string) {
    await this.basePage.takeScreenshot(name);
  }

  async waitForPageLoad() {
    await this.basePage.waitForPageLoad();
  }

  async waitForTimeout(ms: number) {
    await this.basePage.waitForTimeout(ms);
  }

  // Hata yakalama ve loglama
  async handleTestError(error: Error, context: string) {
    console.error(`Test Error in ${context}:`, error.message);
    await this.takeScreenshot(`error-${context}-${Date.now()}`);
    throw error;
  }

  // Test verisi oluşturma metodları
  generateUserData() {
    return this.testDataHelper.generateUserData();
  }

  generateFormData() {
    return this.testDataHelper.generateFormData();
  }

  generateTableData() {
    return this.testDataHelper.generateTableData();
  }

  // Dinamik element oluşturma metodları
  getElementByText(text: string) {
    return this.elementHelper.byText(text);
  }

  getElementByRole(role: string, options?: { name?: string; exact?: boolean }) {
    return this.elementHelper.byRole(role, options);
  }

  getElementById(id: string) {
    return this.elementHelper.byId(id);
  }

  getElementByClass(className: string) {
    return this.elementHelper.byClass(className);
  }

  // Assertion metodları
  async expectElementVisible(locator: any) {
    await this.assertionHelper.expectElementVisible(locator);
  }

  async expectElementText(locator: any, expectedText: string) {
    await this.assertionHelper.expectElementText(locator, expectedText);
  }

  async expectPageTitle(expectedTitle: string) {
    await this.assertionHelper.expectPageTitle(expectedTitle);
  }

  async expectPageUrl(expectedUrl: string) {
    await this.assertionHelper.expectPageUrl(expectedUrl);
  }

  // Form işlemleri
  async fillFormField(locator: any, value: string) {
    await this.basePage.fillInput(locator, value);
  }

  async clickElement(locator: any) {
    await this.basePage.clickElement(locator);
  }

  async selectDropdownOption(locator: any, value: string) {
    await this.basePage.selectOption(locator, value);
  }

  async checkCheckbox(locator: any) {
    await this.basePage.checkElement(locator);
  }

  async uncheckCheckbox(locator: any) {
    await this.basePage.uncheckElement(locator);
  }

  // Tablo işlemleri
  async getTableRowCount(tableLocator: any) {
    const rows = tableLocator.locator('tr');
    return await rows.count();
  }

  async getTableCellText(tableLocator: any, row: number, col: number) {
    const cell = this.elementHelper.byTableCell(row, col);
    return await cell.textContent();
  }

  // Modal işlemleri
  async waitForModal(modalTitle?: string) {
    if (modalTitle) {
      const modal = this.page.locator(`[role="dialog"]:has-text("${modalTitle}")`);
      await this.assertionHelper.expectElementVisible(modal);
    } else {
      const modal = this.page.locator('[role="dialog"]');
      await this.assertionHelper.expectElementVisible(modal);
    }
  }

  async closeModal() {
    const closeButton = this.page.locator('[role="dialog"] button:has-text("Close"), [role="dialog"] .close, [role="dialog"] [aria-label="Close"]');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }

  // Dosya yükleme işlemleri
  async uploadFile(inputLocator: any, filePath: string) {
    await inputLocator.setInputFiles(filePath);
  }

  // Scroll işlemleri
  async scrollToElement(locator: any) {
    await this.basePage.scrollToElement(locator);
  }

  async scrollToTop() {
    await this.basePage.scrollToTop();
  }

  async scrollToBottom() {
    await this.basePage.scrollToBottom();
  }

  // Klavye işlemleri
  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  async typeText(text: string) {
    await this.page.keyboard.type(text);
  }

  // Mouse işlemleri
  async hoverOverElement(locator: any) {
    await locator.hover();
  }

  async rightClickElement(locator: any) {
    await locator.click({ button: 'right' });
  }

  async doubleClickElement(locator: any) {
    await locator.dblclick();
  }

  // Drag & Drop işlemleri
  async dragAndDrop(sourceLocator: any, targetLocator: any) {
    await sourceLocator.dragTo(targetLocator);
  }

  // Bekleme metodları
  async waitForElement(locator: any, timeout = 10000) {
    await this.basePage.waitForElement(locator, timeout);
  }

  async waitForElementToBeVisible(locator: any, timeout = 10000) {
    await this.basePage.waitForElementToBeVisible(locator, timeout);
  }

  // Network işlemleri
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForResponse(url: string) {
    await this.page.waitForResponse(response => response.url().includes(url));
  }

  // Performans testleri
  async measurePageLoadTime(): Promise<number> {
    const startTime = Date.now();
    await this.page.waitForLoadState('networkidle');
    return Date.now() - startTime;
  }

  // Test durumu kontrolü
  async isElementVisible(locator: any): Promise<boolean> {
    try {
      await this.assertionHelper.expectElementVisible(locator, 5000);
      return true;
    } catch {
      return false;
    }
  }

  async isElementEnabled(locator: any): Promise<boolean> {
    try {
      await this.assertionHelper.expectElementEnabled(locator, 5000);
      return true;
    } catch {
      return false;
    }
  }

  // Dinamik test verisi oluşturma
  generateRandomEmail(): string {
    return this.testDataHelper.generateTextData().randomEmail();
  }

  generateRandomName(): string {
    return this.testDataHelper.generateTextData().randomName();
  }

  generateRandomPhone(): string {
    return this.testDataHelper.generateTextData().randomPhone();
  }

  generateRandomNumber(min: number, max: number): number {
    return this.testDataHelper.generateNumericData().randomNumber(min, max);
  }
}

// Test fixtures için base test
export const test = base.extend<TestFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },

  elementHelper: async ({ page }, use) => {
    const elementHelper = new ElementHelper(page);
    await use(elementHelper);
  },

  testDataHelper: async ({}, use) => {
    await use(TestDataHelper);
  },

  assertionHelper: async ({ page }, use) => {
    const assertionHelper = new AssertionHelper(page);
    await use(assertionHelper);
  },
});

export { expect } from '@playwright/test'; 