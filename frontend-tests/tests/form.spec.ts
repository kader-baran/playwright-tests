import test from "../fixtures/test";
import { formTestData } from "../data/testData";

test("Form doldurma ve doğrulama", async ({ homePage, formPage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToForm();

  await formPage.verifyPageLoaded();
  await formPage.fillForm(formTestData);
  await formPage.submitForm();
  await formPage.verifyFormSubmitted();
});
