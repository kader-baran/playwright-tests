import test from "../fixtures/test";

test("JavaScript alert işlemleri", async ({
  homePage,
  javaScriptAlertPage,
}) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToJavaScriptAlert();

  await javaScriptAlertPage.verifyPageLoaded();
  await javaScriptAlertPage.setupDialogHandler();
  await javaScriptAlertPage.clickShowAlert();
  await javaScriptAlertPage.clickShowConfirm();
  await javaScriptAlertPage.clickShowPrompt();
});
