import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Locators
  private elementsCard: Locator;
  private formsCard: Locator;
  private widgetsCard: Locator;
  private interactionsCard: Locator;
  private bookStoreCard: Locator;

  constructor(page: Page) {
    super(page);
    this.elementsCard = this.page.locator('.card-body').filter({ hasText: 'Elements' });
    this.formsCard = this.page.locator('.card-body').filter({ hasText: 'Forms' });
    this.widgetsCard = this.page.locator('.card-body').filter({ hasText: 'Widgets' });
    this.interactionsCard = this.page.locator('.card-body').filter({ hasText: 'Interactions' });
    this.bookStoreCard = this.page.locator('.card-body').filter({ hasText: 'Book Store Application' });
  }

  async navigateToHome() {
    await this.navigateTo('https://demoqa.com/');
  }

  async clickElementsCard() {
    await this.clickElement(this.elementsCard);
  }

  async clickFormsCard() {
    await this.clickElement(this.formsCard);
  }

  async clickWidgetsCard() {
    await this.clickElement(this.widgetsCard);
  }

  async clickInteractionsCard() {
    await this.clickElement(this.interactionsCard);
  }

  async clickBookStoreCard() {
    await this.clickElement(this.bookStoreCard);
  }

  async expectElementsCardVisible() {
    await this.expectElementVisible(this.elementsCard);
  }

  async expectFormsCardVisible() {
    await this.expectElementVisible(this.formsCard);
  }

  async expectWidgetsCardVisible() {
    await this.expectElementVisible(this.widgetsCard);
  }

  async expectInteractionsCardVisible() {
    await this.expectElementVisible(this.interactionsCard);
  }

  async expectBookStoreCardVisible() {
    await this.expectElementVisible(this.bookStoreCard);
  }
} 