import test from "../fixtures/test";

test("Iframe etkileşimleri", async ({ homePage, iframePage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToIframe();

  await iframePage.verifyPageLoaded();
  await iframePage.clickIframe1Button();
  await iframePage.clickIframe2Button();
});
