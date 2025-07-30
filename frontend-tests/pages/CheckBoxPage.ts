import { Page, Locator, expect } from '@playwright/test';

export class CheckBoxPage {
  readonly page: Page;
  readonly checkBoxMenu: Locator;
  readonly homeCheckbox: Locator;
  readonly homeCheckboxInput: Locator;
  readonly expandButton: Locator;
  readonly collapseButton: Locator;
  readonly result: Locator;
  readonly desktopCheckbox: Locator;
  readonly desktopCheckboxInput: Locator;
  readonly documentsCheckbox: Locator;
  readonly documentsCheckboxInput: Locator;
  readonly downloadsCheckbox: Locator;
  readonly downloadsCheckboxInput: Locator;
  readonly notesCheckboxInput: Locator;
  readonly commandsCheckboxInput: Locator;
  readonly workspaceCheckboxInput: Locator;
  readonly officeCheckboxInput: Locator;
  readonly wordFileCheckboxInput: Locator;
  readonly excelFileCheckboxInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkBoxMenu = page.getByRole('listitem').filter({ hasText: 'Check Box' });
    this.homeCheckbox = page.locator('label[for="tree-node-home"] span.rct-checkbox');
    this.homeCheckboxInput = page.locator('input#tree-node-home');
    this.expandButton = page.locator('button[title="Expand all"]');
    this.collapseButton = page.locator('button[title="Collapse all"]');
    this.result = page.locator('#result');
    this.desktopCheckbox = page.locator('label[for="tree-node-desktop"] span.rct-checkbox');
    this.desktopCheckboxInput = page.locator('input#tree-node-desktop');
    this.documentsCheckbox = page.locator('label[for="tree-node-documents"] span.rct-checkbox');
    this.documentsCheckboxInput = page.locator('input#tree-node-documents');
    this.downloadsCheckbox = page.locator('label[for="tree-node-downloads"] span.rct-checkbox');
    this.downloadsCheckboxInput = page.locator('input#tree-node-downloads');
    this.notesCheckboxInput = page.locator('input#tree-node-notes');
    this.commandsCheckboxInput = page.locator('input#tree-node-commands');
    this.workspaceCheckboxInput = page.locator('input#tree-node-workspace');
    this.officeCheckboxInput = page.locator('input#tree-node-office');
    this.wordFileCheckboxInput = page.locator('input#tree-node-wordFile');
    this.excelFileCheckboxInput = page.locator('input#tree-node-excelFile');
  }

  async clickCheckBoxMenu() {
    await expect(this.checkBoxMenu).toBeVisible();
    await this.checkBoxMenu.click();
    await expect(this.page).toHaveURL(/\/checkbox$/);
  }

  async selectHomeCheckbox() {
    await this.homeCheckbox.click();
    await expect(this.homeCheckboxInput).toBeChecked();
  }

  async unselectHomeCheckbox() {
    await this.homeCheckbox.click();
    await expect(this.homeCheckboxInput).not.toBeChecked();
  }

  async expandAll() {
    await this.expandButton.click();
    await expect(this.page.locator('label[for="tree-node-desktop"]')).toBeVisible();
    await expect(this.page.locator('label[for="tree-node-documents"]')).toBeVisible();
    await expect(this.page.locator('label[for="tree-node-downloads"]')).toBeVisible();
  }

  async collapseAll() {
    await this.collapseButton.click();
    await expect(this.page.locator('label[for="tree-node-desktop"]')).not.toBeVisible();
    await expect(this.page.locator('label[for="tree-node-documents"]')).not.toBeVisible();
    await expect(this.page.locator('label[for="tree-node-downloads"]')).not.toBeVisible();
  }

  async verifyResultContains(text: string) {
    await expect(this.result).toContainText('You have selected :');
    await expect(this.result).toContainText(text);
  }

  async verifySubCheckboxesAfterHomeSelection() {
    await expect(this.desktopCheckboxInput).toBeChecked();
    await expect(this.documentsCheckboxInput).toBeChecked();
    await expect(this.downloadsCheckboxInput).toBeChecked();
  }

  async verifySubCheckboxesAfterHomeUnselection() {
    await expect(this.desktopCheckboxInput).not.toBeChecked();
    await expect(this.documentsCheckboxInput).not.toBeChecked();
    await expect(this.downloadsCheckboxInput).not.toBeChecked();
  }

  async selectDesktopCheckbox() {
    await this.desktopCheckbox.click();
    await expect(this.desktopCheckboxInput).toBeChecked();
  }

  async unselectDesktopCheckbox() {
    await this.desktopCheckbox.click();
    await expect(this.desktopCheckboxInput).not.toBeChecked();
  }

  async verifyDesktopSubCheckboxes() {
    await expect(this.notesCheckboxInput).toBeChecked();
    await expect(this.commandsCheckboxInput).toBeChecked();
  }

  async verifyDesktopSubCheckboxesUnselected() {
    await expect(this.notesCheckboxInput).not.toBeChecked();
    await expect(this.commandsCheckboxInput).not.toBeChecked();
  }

  async selectDocumentsCheckbox() {
    await this.documentsCheckbox.click();
    await expect(this.documentsCheckboxInput).toBeChecked();
  }

  async unselectDocumentsCheckbox() {
    await this.documentsCheckbox.click();
    await expect(this.documentsCheckboxInput).not.toBeChecked();
  }

  async verifyDocumentsSubCheckboxes() {
    await expect(this.workspaceCheckboxInput).toBeChecked();
    await expect(this.officeCheckboxInput).toBeChecked();
  }

  async verifyDocumentsSubCheckboxesUnselected() {
    await expect(this.workspaceCheckboxInput).not.toBeChecked();
    await expect(this.officeCheckboxInput).not.toBeChecked();
  }

  async selectDownloadsCheckbox() {
    await this.downloadsCheckbox.click();
    await expect(this.downloadsCheckboxInput).toBeChecked();
  }

  async unselectDownloadsCheckbox() {
    await this.downloadsCheckbox.click();
    await expect(this.downloadsCheckboxInput).not.toBeChecked();
  }

  async verifyDownloadsSubCheckboxes() {
    await expect(this.wordFileCheckboxInput).toBeChecked();
    await expect(this.excelFileCheckboxInput).toBeChecked();
  }

  async verifyDownloadsSubCheckboxesUnselected() {
    await expect(this.wordFileCheckboxInput).not.toBeChecked();
    await expect(this.excelFileCheckboxInput).not.toBeChecked();
  }
} 