import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";

export class DragAndDropPage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly sortableList: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Drag & Drop Demo")');
    this.sortableList = page.locator("#sortableList");
  }

  async verifyPageLoaded() {
    Logger.info("Verify Drag & Drop page loaded");
    await expect(this.pageTitle).toBeVisible();
  }

  async dragItemToPosition(fromIndex: number, toIndex: number) {
    Logger.info(`Drag item from index ${fromIndex} to ${toIndex}`);
    await expect(this.sortableList).toBeVisible();

    const fromItem = this.sortableList.locator("li").nth(fromIndex);
    const toItem = this.sortableList.locator("li").nth(toIndex);

    await expect(fromItem).toBeVisible();
    await expect(toItem).toBeVisible();

    await fromItem.dragTo(toItem);

    // Verify items are still visible after drag
    Logger.info("Verify items visible after drag");
    await expect(fromItem).toBeVisible();
    await expect(toItem).toBeVisible();
  }
}
