import test from "../fixtures/test";
import { dragAndDropTestData } from "../data/testData";

test("Drag & Drop akışı", async ({ homePage, dragAndDropPage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToDragAndDrop();

  await dragAndDropPage.verifyPageLoaded();
  for (const d of dragAndDropTestData) {
    await dragAndDropPage.dragItemToPosition(d.fromIndex, d.toIndex);
  }
});
