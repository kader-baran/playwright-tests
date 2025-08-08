import test from "../fixtures/test";

test("Dropdown akışı", async ({ homePage, dropdownPage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToDropdown();

  await dropdownPage.verifyPageLoaded();
  await dropdownPage.selectFruit("Apple");
  await dropdownPage.verifyFruitSelection("Apple");
  await dropdownPage.selectCountry("India");
  await dropdownPage.clickFirstSelected();
});
