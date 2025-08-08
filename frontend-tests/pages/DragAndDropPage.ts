import { Page, Locator, expect } from '@playwright/test';

export class DragAndDropPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly sortableList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Drag & Drop Demo")');
    this.sortableList = page.locator('#sortableList');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }

  async dragItemToPosition(fromIndex: number, toIndex: number) {
    await expect(this.sortableList).toBeVisible();
    
    const fromItem = this.sortableList.locator('li').nth(fromIndex);
    const toItem = this.sortableList.locator('li').nth(toIndex);
    
    await expect(fromItem).toBeVisible();
    await expect(toItem).toBeVisible();
    
    await fromItem.dragTo(toItem);
    
    // Verify items are still visible after drag
    await expect(fromItem).toBeVisible();
    await expect(toItem).toBeVisible();
  }
} 