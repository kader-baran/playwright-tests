import { Page, Locator, expect } from '@playwright/test';

export class ButtonsPage {
  readonly page: Page;
  readonly buttonsMenu: Locator;
  readonly doubleClickButton: Locator;
  readonly rightClickButton: Locator;
  readonly clickMeButton: Locator;
  readonly doubleClickMessage: Locator;
  readonly rightClickMessage: Locator;
  readonly dynamicClickMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonsMenu = page.getByRole('listitem').filter({ hasText: 'Buttons' });
    this.doubleClickButton = page.getByRole('button', { name: 'Double Click Me' });
    this.rightClickButton = page.getByRole('button', { name: 'Right Click Me' });
    this.clickMeButton = page.locator('button.btn.btn-primary:has-text("Click Me"):not([id*="doubleClick"]):not([id*="rightClick"])');
    this.doubleClickMessage = page.locator('#doubleClickMessage');
    this.rightClickMessage = page.locator('#rightClickMessage');
    this.dynamicClickMessage = page.locator('p:has-text("You have done a dynamic click")');
  }

  async clickButtonsMenu() {
    await expect(this.buttonsMenu).toBeVisible();
    await this.buttonsMenu.click();
    await expect(this.page).toHaveURL(/\/buttons$/);
  }

  async performDoubleClick() {
    await this.doubleClickButton.click();
    await expect(this.doubleClickMessage).not.toBeVisible();
    await this.doubleClickButton.dblclick();
    await expect(this.doubleClickMessage).toBeVisible();
    await expect(this.doubleClickMessage).toHaveText('You have done a double click');
  }

  async performRightClick() {
    await this.rightClickButton.click();
    await expect(this.rightClickMessage).not.toBeVisible();
    await this.rightClickButton.click({ button: 'right' });
    await expect(this.rightClickMessage).toBeVisible();
    await expect(this.rightClickMessage).toHaveText('You have done a right click');
  }

  async performDynamicClick() {
    await this.page.goto('https://demoqa.com/buttons');
    await expect(this.clickMeButton).toBeVisible();
    await this.clickMeButton.click();
    await expect(this.dynamicClickMessage).toBeVisible();
    await expect(this.dynamicClickMessage).toHaveText('You have done a dynamic click');
  }
} 