import test from "../fixtures/test";

test("Checkbox akışı", async ({ homePage, checkboxPage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToCheckbox();

  await checkboxPage.verifyPageLoaded();
  await checkboxPage.clickCheckMeCheckbox();
  await checkboxPage.verifyEnableCheckboxes();
  await checkboxPage.checkAllCheckboxes();
  await checkboxPage.toggleAllCheckboxes();
});
