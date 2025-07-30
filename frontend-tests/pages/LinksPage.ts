import { Page, Locator, expect } from '@playwright/test';

export class LinksPage {
  readonly page: Page;
  readonly linksMenu: Locator;
  readonly simpleLink: Locator;
  readonly dynamicLink: Locator;
  readonly createdLink: Locator;
  readonly noContentLink: Locator;
  readonly movedLink: Locator;
  readonly linkResponse: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linksMenu = page.locator('li#item-5').filter({ hasText: /^Links$/ });
    this.simpleLink = page.locator('#simpleLink');
    this.dynamicLink = page.locator('#dynamicLink');
    this.createdLink = page.locator('#created');
    this.noContentLink = page.locator('#no-content');
    this.movedLink = page.locator('#moved');
    this.linkResponse = page.locator('#linkResponse');
  }

  async clickLinksMenu() {
    await expect(this.linksMenu).toBeVisible();
    await this.linksMenu.click();
    await expect(this.page).toHaveURL(/\/links$/);
  }

  async clickSimpleLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.simpleLink.click()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://demoqa.com/');
    await newPage.close();
  }

  async clickDynamicLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.dynamicLink.click()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://demoqa.com/');
    await newPage.close();
  }

  async clickCreatedLink() {
    await this.createdLink.click();
    await expect(this.linkResponse).toBeVisible();
    await expect(this.linkResponse).toContainText('Link has responded with staus 201 and status text Created');
  }

  async clickNoContentLink() {
    await this.noContentLink.click();
    await expect(this.linkResponse).toBeVisible();
    await expect(this.linkResponse).toContainText('Link has responded with staus 204 and status text No Content');
  }

  async clickMovedLink() {
    await this.movedLink.click();
    await expect(this.linkResponse).toBeVisible();
    await expect(this.linkResponse).toContainText('Link has responded with staus 301 and status text Moved Permanently');
  }
} 