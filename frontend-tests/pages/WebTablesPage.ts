import { Page, Locator, expect } from '@playwright/test';

export class WebTablesPage {
  readonly page: Page;
  readonly webTablesMenu: Locator;
  readonly addButton: Locator;
  readonly modalContent: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;
  readonly submitButton: Locator;
  readonly tableBody: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.webTablesMenu = page.locator('li#item-3');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.modalContent = page.locator('.modal-content');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.tableBody = page.locator('.rt-tbody');
    this.searchBox = page.locator('#searchBox');
  }

  async clickWebTablesMenu() {
    // Web Tables menüsünün görünür olduğunu kontrol et
    await expect(this.webTablesMenu).toBeVisible({ timeout: 10000 });
    
    // Web Tables menüsüne tıkla
    await this.webTablesMenu.click();
    
    // URL'nin değiştiğini kontrol et
    await expect(this.page).toHaveURL(/\/webtables$/);
    
    // Sayfa tamamen yüklenmesini bekle
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Web Tables sayfasının yüklendiğini kontrol et
    await expect(this.page.getByRole('heading', { name: 'Web Tables' })).toBeVisible({ timeout: 10000 });
    
    // Web Tables elementlerinin görünür olduğunu kontrol et
    await expect(this.addButton).toBeVisible({ timeout: 10000 });
    
    // Ek güvenlik için kısa bir bekleme
    await this.page.waitForTimeout(1000);
  }

  async verifyDefaultRecords() {
    await expect(this.tableBody).toContainText('Cierra');
    await expect(this.tableBody).toContainText('Alden');
    await expect(this.tableBody).toContainText('Kierra');
  }

  async clickAddButton() {
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();
    await expect(this.modalContent).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
  }

  async fillPersonForm(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(age);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
  }

  async submitPersonForm() {
    await expect(this.submitButton).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
    await this.page.waitForTimeout(500); // Butonun stabil olması için bekle
    await this.submitButton.click();
    await this.page.waitForTimeout(1000); // Modal'ın kapanması için bekle
  }

  async verifyPersonInTable(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
    await expect(this.tableBody).toContainText(firstName);
    await expect(this.tableBody).toContainText(lastName);
    await expect(this.tableBody).toContainText(email);
    await expect(this.tableBody).toContainText(age);
    await expect(this.tableBody).toContainText(salary);
    await expect(this.tableBody).toContainText(department);
  }

  async searchPerson(searchText: string) {
    await this.searchBox.fill(searchText);
    await expect(this.tableBody).toContainText(searchText);
  }
} 