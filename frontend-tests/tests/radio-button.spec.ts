import test from "../fixtures/test";

test("Radio Button akışı", async ({ homePage, radioButtonPage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToRadioButton();

  await radioButtonPage.verifyPageLoaded();
  await radioButtonPage.selectRadioButton1();
  await radioButtonPage.selectAgeGroup1835();
  await radioButtonPage.showSelectedValues();
  await radioButtonPage.verifyResult();
});
