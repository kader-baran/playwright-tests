import { test, expect } from "../utils/TestBase";
import { HomePage } from "../pages/HomePage";
import { TestDataHelper } from "../utils/TestDataHelper";

test.describe("HomePage Tests - Chrome Standart", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.setupTest();
  });

  test("Ana sayfa yüklenir ve tüm kartlar görünür", async ({ page }) => {
    // Ana sayfaya git
    await homePage.goto();

    // Sayfa doğrulamaları
    await homePage.expectOnHomePage();
    await homePage.expectPageTitle();
    await homePage.expectAllCardsVisible();
    await homePage.expectHeaderVisible();
    await homePage.expectCorrectNumberOfCards(6);

    // Screenshot al
    await homePage.takeScreenshot("homepage-loaded");
  });

  test("Elements kartına tıklama ve sayfa geçişi", async ({ page }) => {
    await homePage.goto();

    // Elements kartına tıkla
    await homePage.clickElementsCard();

    // URL kontrolü
    await homePage.expectUrl("https://demoqa.com/elements");

    // Sayfa yüklendiğini doğrula
    await homePage.waitForPageLoad();
  });

  test("Forms kartına tıklama ve sayfa geçişi", async ({ page }) => {
    await homePage.goto();

    // Forms kartına tıkla
    await homePage.clickFormsCard();

    // URL kontrolü
    await homePage.expectUrl("https://demoqa.com/forms");

    // Sayfa yüklendiğini doğrula
    await homePage.waitForPageLoad();
  });

  test("Dinamik test verisi ile test", async ({ page }) => {
    await homePage.goto();

    // Dinamik test verisi oluştur
    const userData = TestDataHelper.generateUserData();
    const formData = TestDataHelper.generateFormData();

    // Test verilerinin doğru formatta olduğunu kontrol et
    expect(userData.firstName).toBeDefined();
    expect(userData.email).toContain("@");
    expect(formData.name).toBeDefined();

    console.log("Oluşturulan test verisi:", { userData, formData });
  });

  test("Tüm kartların içerik kontrolü", async ({ page }) => {
    await homePage.goto();

    // Beklenen kart metinleri
    const expectedCardTexts = [
      "Elements",
      "Forms",
      "Alerts, Frame & Windows",
      "Widgets",
      "Interactions",
      "Book Store Application",
    ];

    // Her kartın içeriğini kontrol et
    for (const cardText of expectedCardTexts) {
      await homePage.expectCardContainsText(cardText);
    }
  });
});
