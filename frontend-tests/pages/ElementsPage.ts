import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ElementsPage extends BasePage {
  // Locators
  private textBoxCard: Locator;
  private checkBoxCard: Locator;
  private radioButtonCard: Locator;
  private webTablesCard: Locator;
  private buttonsCard: Locator;
  private linksCard: Locator;

  // TextBox locators
  private userNameInput: Locator;
  private userEmailInput: Locator;
  private currentAddressInput: Locator;
  private permanentAddressInput: Locator;
  private submitButton: Locator;
  private outputDiv: Locator;

  // CheckBox locators
  private homeCheckbox: Locator;
  private expandButton: Locator;
  private collapseButton: Locator;
  private successText: Locator;

  // Radio Button locators
  private yesLabel: Locator;
  private impressiveLabel: Locator;
  private noRadio: Locator;
  private successMessage: Locator;

  // Web Tables locators
  private addButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private ageInput: Locator;
  private salaryInput: Locator;
  private departmentInput: Locator;
  private tableBody: Locator;
  private modalHeader: Locator;

  // Buttons locators
  private doubleClickButton: Locator;
  private rightClickButton: Locator;
  private clickMeButton: Locator;
  private doubleClickMessage: Locator;
  private rightClickMessage: Locator;
  private dynamicClickMessage: Locator;

  // Links locators
  private homeLink: Locator;
  private homeJMqJtLink: Locator;
  private createdLink: Locator;
  private noContentLink: Locator;
  private linkResponse: Locator;

  constructor(page: Page) {
    super(page);
    
    // Main cards
    this.textBoxCard = this.page.locator('.element-list').locator('li').filter({ hasText: 'Text Box' });
    this.checkBoxCard = this.page.locator('.element-list').locator('li').filter({ hasText: 'Check Box' });
    this.radioButtonCard = this.page.locator('.element-list').locator('li').filter({ hasText: 'Radio Button' });
    this.webTablesCard = this.page.locator('.element-list').locator('li').filter({ hasText: 'Web Tables' });
    this.buttonsCard = this.page.locator('.element-list').locator('li').filter({ hasText: 'Buttons' });
    this.linksCard = this.page.locator('li').filter({ hasText: 'Links' }).first();

    // TextBox locators
    this.userNameInput = this.page.locator('#userName');
    this.userEmailInput = this.page.locator('#userEmail');
    this.currentAddressInput = this.page.locator('#currentAddress');
    this.permanentAddressInput = this.page.locator('#permanentAddress');
    this.submitButton = this.page.locator('#submit');
    this.outputDiv = this.page.locator('#output');

    // CheckBox locators
    this.homeCheckbox = this.page.locator('.rct-checkbox').first();
    this.expandButton = this.page.locator('.rct-icon-expand-close').first();
    this.collapseButton = this.page.locator('.rct-icon-expand-open').first();
    this.successText = this.page.locator('.text-success').first();

    // Radio Button locators
    this.yesLabel = this.page.locator('label[for="yesRadio"]');
    this.impressiveLabel = this.page.locator('label[for="impressiveRadio"]');
    this.noRadio = this.page.locator('#noRadio');
    this.successMessage = this.page.locator('.text-success');

    // Web Tables locators
    this.addButton = this.page.locator('#addNewRecordButton');
    this.firstNameInput = this.page.locator('#firstName');
    this.lastNameInput = this.page.locator('#lastName');
    this.emailInput = this.page.locator('#userEmail');
    this.ageInput = this.page.locator('#age');
    this.salaryInput = this.page.locator('#salary');
    this.departmentInput = this.page.locator('#department');
    this.tableBody = this.page.locator('.rt-tbody');
    this.modalHeader = this.page.locator('.modal-header');

    // Buttons locators
    this.doubleClickButton = this.page.locator('#doubleClickBtn');
    this.rightClickButton = this.page.locator('#rightClickBtn');
    this.clickMeButton = this.page.locator('button').filter({ hasText: 'Click Me' }).nth(2);
    this.doubleClickMessage = this.page.locator('#doubleClickMessage');
    this.rightClickMessage = this.page.locator('#rightClickMessage');
    this.dynamicClickMessage = this.page.locator('#dynamicClickMessage');

    // Links locators
    this.homeLink = this.page.locator('#simpleLink');
    this.homeJMqJtLink = this.page.locator('#dynamicLink');
    this.createdLink = this.page.locator('#created');
    this.noContentLink = this.page.locator('#no-content');
    this.linkResponse = this.page.locator('#linkResponse');
  }

  // Navigation methods
  async navigateToElements() {
    await this.navigateTo('https://demoqa.com/elements');
  }

  // Card click methods
  async clickTextBoxCard() {
    await this.clickElement(this.textBoxCard);
  }

  async clickCheckBoxCard() {
    await this.clickElement(this.checkBoxCard);
  }

  async clickRadioButtonCard() {
    await this.clickElement(this.radioButtonCard);
  }

  async clickWebTablesCard() {
    await this.clickElement(this.webTablesCard);
  }

  async clickButtonsCard() {
    await this.clickElement(this.buttonsCard);
  }

  async clickLinksCard() {
    await this.clickElement(this.linksCard);
  }

  // TextBox methods
  async fillTextBoxForm(userName: string, userEmail: string, currentAddress: string, permanentAddress: string) {
    await this.fillInput(this.userNameInput, userName);
    await this.fillInput(this.userEmailInput, userEmail);
    await this.fillInput(this.currentAddressInput, currentAddress);
    await this.fillInput(this.permanentAddressInput, permanentAddress);
  }

  async submitTextBoxForm() {
    await this.clickElement(this.submitButton);
  }

  async expectTextBoxOutputVisible() {
    await this.expectElementVisible(this.outputDiv);
  }

  // CheckBox methods
  async clickHomeCheckbox() {
    await this.clickElement(this.homeCheckbox);
  }

  async clickExpandButton() {
    await this.clickElement(this.expandButton);
  }

  async clickCollapseButton() {
    await this.clickElement(this.collapseButton);
  }

  async expectSuccessTextContains(text: string) {
    await this.expectElementContainsText(this.successText, text);
  }

  async expectNoSuccessText() {
    await expect(this.page.locator('.text-success')).toHaveCount(0);
  }

  async expectExpandedNodeVisible() {
    await this.expectElementVisible(this.page.locator('.rct-node-expanded'));
  }

  async expectCollapsedNodeVisible() {
    await this.expectElementVisible(this.page.locator('.rct-node-collapsed'));
  }

  // Radio Button methods
  async clickYesLabel() {
    await this.clickElement(this.yesLabel);
  }

  async clickImpressiveLabel() {
    await this.clickElement(this.impressiveLabel);
  }

  async expectNoRadioDisabled() {
    await expect(this.noRadio).toBeDisabled();
  }

  async expectSuccessMessageContains(text: string) {
    await this.expectElementContainsText(this.successMessage, text);
  }

  // Web Tables methods
  async clickAddButton() {
    await this.clickElement(this.addButton);
  }

  async fillWebTableForm(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.ageInput, age);
    await this.fillInput(this.salaryInput, salary);
    await this.fillInput(this.departmentInput, department);
  }

  async expectTableBodyContains(text: string) {
    await this.expectElementContainsText(this.tableBody, text);
  }

  async expectModalHeaderContains(text: string) {
    await this.expectElementContainsText(this.modalHeader, text);
  }

  // Buttons methods
  async doubleClickDoubleClickButton() {
    await this.doubleClickElement(this.doubleClickButton);
  }

  async rightClickRightClickButton() {
    await this.rightClickElement(this.rightClickButton);
  }

  async clickClickMeButton() {
    await this.clickElement(this.clickMeButton);
  }

  async expectDoubleClickMessageContains(text: string) {
    await this.expectElementContainsText(this.doubleClickMessage, text);
  }

  async expectRightClickMessageContains(text: string) {
    await this.expectElementContainsText(this.rightClickMessage, text);
  }

  async expectDynamicClickMessageContains(text: string) {
    await this.expectElementContainsText(this.dynamicClickMessage, text);
  }

  // Links methods
  async clickHomeLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.clickElement(this.homeLink)
    ]);
    return newPage;
  }

  async clickHomeJMqJtLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.clickElement(this.homeJMqJtLink)
    ]);
    return newPage;
  }

  async clickCreatedLink() {
    await this.clickElement(this.createdLink);
  }

  async clickNoContentLink() {
    await this.clickElement(this.noContentLink);
  }

  async expectLinkResponseContains(text: string) {
    await this.expectElementContainsText(this.linkResponse, text);
  }
} 