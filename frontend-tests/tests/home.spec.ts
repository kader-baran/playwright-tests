import test from "../fixtures/test";

test("Home sayfası yüklenir", async ({ homePage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
});
