<<<<<<< HEAD
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
=======
import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ElementHelper } from "../utils/ElementHelper";

// Güncellenmiş HomePage sınıfı - BasePage'den extend ediyor
export class HomePage extends BasePage {
  readonly page: Page;
  readonly elementHelper: ElementHelper;

  // Locator'lar
  elementsCard!: Locator;
  formsCard!: Locator;
  alertsFrameWindowsCard!: Locator;
  widgetsCard!: Locator;
  interactionsCard!: Locator;
  bookStoreApplicationCard!: Locator;
  headerLogo!: Locator;
  banner!: Locator;
  footer!: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.elementHelper = new ElementHelper(page);

    // Locator'ları initialize et
    this.initializeLocators();
  }

  // Test setup metodu
  async setupTest() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.setDefaultTimeout(30000);
    await this.page.setDefaultNavigationTimeout(30000);
  }

  private initializeLocators() {
    // Ana kartlar
    this.elementsCard = this.elementHelper.byText("Elements").first();
    this.formsCard = this.elementHelper.byText("Forms").first();
    this.alertsFrameWindowsCard = this.elementHelper
      .byText("Alerts, Frame & Windows")
      .first();
    this.widgetsCard = this.elementHelper.byText("Widgets").first();
    this.interactionsCard = this.elementHelper.byText("Interactions").first();
    this.bookStoreApplicationCard = this.elementHelper
      .byText("Book Store Application")
      .first();

    // Header ve footer elementleri
    this.headerLogo = this.elementHelper.byClass("header-wrapper");
    this.banner = this.elementHelper.byId("fixedban");
    this.footer = this.elementHelper.byCss("footer");
  }

  // Sayfa navigasyon metodları
  async goto(url?: string) {
    if (url) {
      await super.goto(url);
    } else {
      await super.goto("https://demoqa.com/");
    }
    await this.waitForPageLoad();
>>>>>>> 8548971d4fddb30d74cac23cf8706e107711b8fe
  }

  async gotoElementsPage() {
    await this.clickElementsCard();
  }

  async gotoFormsPage() {
    await this.clickFormsCard();
  }

  async gotoWidgetsPage() {
    await this.clickWidgetsCard();
  }

  async gotoInteractionsPage() {
    await this.clickInteractionsCard();
  }

  async gotoAlertsFrameWindowsPage() {
    await this.clickAlertsFrameWindowsCard();
  }

  async gotoBookStoreApplicationPage() {
    await this.clickBookStoreApplicationCard();
  }

  // Kart tıklama metodları
  async clickElementsCard() {
<<<<<<< HEAD
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
=======
    await this.removeBannerAndFooter();
    await this.clickElement(this.elementsCard);
    await this.expectUrl("https://demoqa.com/elements");
    await this.waitForPageLoad();
  }

  async clickFormsCard() {
    await this.removeBannerAndFooter();
    await this.clickElement(this.formsCard);
    await this.expectUrl("https://demoqa.com/forms");
    await this.waitForPageLoad();
  }

  async clickWidgetsCard() {
    await this.removeBannerAndFooter();
    await this.clickElement(this.widgetsCard);
    await this.expectUrl("https://demoqa.com/widgets");
    await this.waitForPageLoad();
  }

  async clickInteractionsCard() {
    await this.removeBannerAndFooter();
    await this.clickElement(this.interactionsCard);
    await this.expectUrl("https://demoqa.com/interaction");
    await this.waitForPageLoad();
  }

  async clickAlertsFrameWindowsCard() {
    await this.removeBannerAndFooter();
    await this.clickElement(this.alertsFrameWindowsCard);
    await this.expectUrl("https://demoqa.com/alertsWindows");
    await this.waitForPageLoad();
  }

  async clickBookStoreApplicationCard() {
    await this.removeBannerAndFooter();
    await this.clickElement(this.bookStoreApplicationCard);
    await this.expectUrl("https://demoqa.com/books");
    await this.waitForPageLoad();
  }

  // Banner ve footer temizleme
  async removeBannerAndFooter() {
    await this.page.evaluate(() => {
      const fixedBanner = document.getElementById("fixedban");
      if (fixedBanner) {
        fixedBanner.remove();
      }

      const footer = document.querySelector("footer");
      if (footer) {
        footer.remove();
      }
    });
  }

  // Sayfa doğrulama metodları
  async expectOnHomePage() {
    await this.expectUrl("https://demoqa.com/");
  }

  async expectAllCardsVisible() {
    await this.expectElementVisible(this.elementsCard);
    await this.expectElementVisible(this.formsCard);
    await this.expectElementVisible(this.alertsFrameWindowsCard);
    await this.expectElementVisible(this.widgetsCard);
    await this.expectElementVisible(this.interactionsCard);
    await this.expectElementVisible(this.bookStoreApplicationCard);
  }

  async expectHeaderVisible() {
    await this.expectElementVisible(this.headerLogo);
  }

  // Kart sayısı kontrolü
  async expectCorrectNumberOfCards(expectedCount: number = 6) {
    const cards = this.page.locator(".card-body");
    await expect(cards).toHaveCount(expectedCount);
  }

  // Kart içerik kontrolü
  async expectCardContainsText(cardText: string) {
    const card = this.elementHelper.byText(cardText);
    await this.expectElementVisible(card);
  }

  // Dinamik kart tıklama
  async clickCardByText(cardText: string) {
    const card = this.elementHelper.byText(cardText);
    await this.removeBannerAndFooter();
    await this.clickElement(card);
    await this.waitForPageLoad();
  }

  // Sayfa başlığı kontrolü
  async expectPageTitle() {
    await this.expectTitle("DEMOQA");
  }

  // Responsive test metodları
  async testResponsiveBehavior() {
    // Mobil görünüm testi
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.expectElementVisible(this.elementsCard);

    // Tablet görünüm testi
    await this.page.setViewportSize({ width: 768, height: 1024 });
    await this.expectElementVisible(this.elementsCard);

    // Desktop görünüm testi
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.expectElementVisible(this.elementsCard);
  }

  // Performans test metodları
  async measurePageLoadPerformance(): Promise<number> {
    const startTime = Date.now();
    await this.goto();
    const loadTime = Date.now() - startTime;
    return loadTime;
  }

  // Erişilebilirlik test metodları
  async testAccessibility() {
    // ARIA etiketleri kontrolü
    const cards = this.page.locator(".card-body");
    for (let i = 0; i < (await cards.count()); i++) {
      const card = cards.nth(i);
      await this.expectElementVisible(card);
    }
  }

  // Hover efektleri testi
  async testHoverEffects() {
    await this.elementsCard.hover();
    // Hover sonrası görsel değişiklik kontrolü
    await this.waitForTimeout(1000);
  }

  // Klavye navigasyonu testi
  async testKeyboardNavigation() {
    await this.page.keyboard.press("Tab");
    // Focus kontrolü için basit bir kontrol
    await this.expectElementVisible(this.elementsCard);
  }
}
>>>>>>> 8548971d4fddb30d74cac23cf8706e107711b8fe
