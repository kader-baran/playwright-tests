import test from "../fixtures/test";

test("Shadow DOM doğrulamaları", async ({ homePage, shadowDomPage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToShadowDom();

  await shadowDomPage.verifyPageLoaded();
  await shadowDomPage.verifyOutsideShadowDomText();
});
