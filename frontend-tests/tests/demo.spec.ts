import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ElementsPage } from "../pages/ElementsPage";
import { FormsPage } from "../pages/FormsPage";
import { testData } from "../data/testData";

test.describe("Demo Test Suite - POM Structure", () => {
  let homePage: HomePage;
  let elementsPage: ElementsPage;
  let formsPage: FormsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);
    formsPage = new FormsPage(page);
  });

  test("Temel test - Home page title kontrolü", async () => {
    await homePage.navigateToHome();
    await homePage.expectTitleContains("DEMOQA");
  });

  test("DemoQA sitesine git ve title kontrolü", async () => {
    await homePage.navigateToHome();
    await homePage.expectTitleContains("DEMOQA");
  });

  test("Elements kartına tıkla ve URL kontrolü", async () => {
    await homePage.navigateToHome();
    await homePage.scalePage();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();
    await homePage.expectUrl("https://demoqa.com/elements");
  });

  test("Elements altında textbox kartını kontrol et ve tıkla", async () => {
    await homePage.navigateToHome();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();
    await homePage.expectUrl("https://demoqa.com/elements");

    // Wait for the page to load completely
    await homePage.waitForPageLoad();

    await elementsPage.clickTextBoxCard();
    await expect(elementsPage["page"].locator("h1")).toContainText("Text Box");
  });

  test("Textbox formunu doldur ve submit et", async () => {
    await homePage.navigateToHome();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();

    // Wait for the page to load completely
    await homePage.waitForPageLoad();

    await elementsPage.clickTextBoxCard();

    await elementsPage.fillTextBoxForm(
      testData.textBoxForm.userName,
      testData.textBoxForm.userEmail,
      testData.textBoxForm.currentAddress,
      testData.textBoxForm.permanentAddress
    );

    await elementsPage.submitTextBoxForm();
    await elementsPage.expectTextBoxOutputVisible();
  });

  test("Checkbox kartına tıkla ve kontrolleri yap", async () => {
    await homePage.navigateToHome();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();

    // Wait for the page to load completely
    await homePage.waitForPageLoad();

    await elementsPage.clickCheckBoxCard();

    await expect(elementsPage["page"].locator("h1")).toContainText("Check Box");

    const homeCheckbox = elementsPage["page"]
      .locator(".rct-title")
      .filter({ hasText: "Home" });
    await expect(homeCheckbox).toBeVisible();
  });

  test("Checkbox home kutucuğunu işaretle ve kontrolleri yap", async () => {
    await homePage.navigateToHome();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();

    // Wait for the page to load completely
    await homePage.waitForPageLoad();

    await elementsPage.clickCheckBoxCard();

    await elementsPage.clickHomeCheckbox();
    await elementsPage.expectSuccessTextContains(testData.messages.home);

    await elementsPage.clickExpandButton();
    await elementsPage.expectExpandedNodeVisible();

    await elementsPage.clickHomeCheckbox();
    await elementsPage.expectNoSuccessText();

    await elementsPage.clickCollapseButton();
    await elementsPage.expectCollapsedNodeVisible();
  });

  test("Radio button testleri", async () => {
    await homePage.navigateToHome();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();

    // Wait for the page to load completely
    await homePage.waitForPageLoad();

    await elementsPage.clickRadioButtonCard();

    await expect(elementsPage["page"].locator("h1")).toContainText(
      "Radio Button"
    );

    await elementsPage.clickYesLabel();
    await elementsPage.expectSuccessMessageContains(testData.messages.yes);

    await elementsPage.clickImpressiveLabel();
    await elementsPage.expectSuccessMessageContains(
      testData.messages.impressive
    );

    await elementsPage.expectNoRadioDisabled();
  });

  test("Web tables testleri", async () => {
    await homePage.navigateToHome();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();

    // Wait for the page to load completely
    await homePage.waitForPageLoad();

    await elementsPage.clickWebTablesCard();

    await expect(elementsPage["page"].locator("h1")).toContainText(
      "Web Tables"
    );
    await expect(elementsPage["page"].locator(".rt-tbody")).toBeVisible();

    await elementsPage.clickAddButton();
    await elementsPage.expectModalHeaderContains(
      testData.messages.registrationForm
    );

    await elementsPage.fillWebTableForm(
      testData.webTableForm.firstName,
      testData.webTableForm.lastName,
      testData.webTableForm.email,
      testData.webTableForm.age,
      testData.webTableForm.salary,
      testData.webTableForm.department
    );

    await elementsPage["page"].locator("#submit").click();

    await elementsPage.expectTableBodyContains(testData.webTableForm.firstName);
    await elementsPage.expectTableBodyContains(testData.webTableForm.email);
    await elementsPage.expectTableBodyContains(testData.webTableForm.age);
    await elementsPage.expectTableBodyContains(testData.webTableForm.salary);
    await elementsPage.expectTableBodyContains(
      testData.webTableForm.department
    );
  });

  test("Buttons testleri", async () => {
    await homePage.navigateToHome();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();

    // Wait for the page to load completely
    await homePage.waitForPageLoad();

    await elementsPage.clickButtonsCard();

    await expect(elementsPage["page"].locator("h1")).toContainText("Buttons");

    await elementsPage.doubleClickDoubleClickButton();
    await elementsPage.expectDoubleClickMessageContains(
      testData.messages.doubleClick
    );

    await elementsPage.rightClickRightClickButton();
    await elementsPage.expectRightClickMessageContains(
      testData.messages.rightClick
    );

    await elementsPage.clickClickMeButton();
    await elementsPage.expectDynamicClickMessageContains(
      testData.messages.dynamicClick
    );
  });

  test("Links testleri", async () => {
    await homePage.navigateToHome();
    await homePage.expectElementsCardVisible();
    await homePage.clickElementsCard();

    // Wait for the page to load completely
    await homePage.waitForPageLoad();

    await elementsPage.clickLinksCard();

    await expect(elementsPage["page"].locator("h1")).toContainText("Links");

    const newPage = await elementsPage.clickHomeLink();
    await newPage.close();

    const newPage2 = await elementsPage.clickHomeJMqJtLink();
    await newPage2.close();

    await elementsPage.clickCreatedLink();
    await elementsPage.expectLinkResponseContains(testData.messages.created);

    await elementsPage.clickNoContentLink();
    await elementsPage.expectLinkResponseContains(testData.messages.noContent);
  });

  test("Forms practice form testleri", async () => {
    await homePage.navigateToHome();
    await homePage.expectFormsCardVisible();
    await homePage.clickFormsCard();

    await formsPage.expectElementVisible(
      formsPage["page"]
        .locator(".element-list")
        .locator("li")
        .filter({ hasText: "Practice Form" })
    );
    await formsPage.clickPracticeFormCard();

    await expect(formsPage["page"].locator("h1")).toContainText(
      "Practice Form"
    );
    await formsPage.scalePage();

    await formsPage.fillCompletePracticeForm(testData.practiceForm);
    await formsPage.submitPracticeForm();
    await formsPage.expectModalContentVisible();
  });
});
