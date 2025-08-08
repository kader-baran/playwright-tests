import test from "../fixtures/test";
import { searchTestData } from "../data/testData";

test("Web Table arama", async ({ homePage, webTablePage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToWebTable();

  await webTablePage.verifyPageLoaded();
  for (const d of searchTestData) {
    await webTablePage.searchAndVerify(d.searchTerm, d.expectedResult);
  }
});
