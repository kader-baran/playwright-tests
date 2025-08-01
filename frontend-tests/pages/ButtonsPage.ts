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
    this.buttonsMenu = page.locator('li#item-4');
    this.doubleClickButton = page.getByRole('button', { name: 'Double Click Me' });
    this.rightClickButton = page.getByRole('button', { name: 'Right Click Me' });
    this.clickMeButton = page.locator('button.btn.btn-primary:has-text("Click Me"):not([id*="doubleClick"]):not([id*="rightClick"])');
    this.doubleClickMessage = page.locator('#doubleClickMessage');
    this.rightClickMessage = page.locator('#rightClickMessage');
    this.dynamicClickMessage = page.locator('p:has-text("You have done a dynamic click")');
  }

  async clickButtonsMenu() {
    // Buttons menüsünün görünür olduğunu kontrol et
    await expect(this.buttonsMenu).toBeVisible({ timeout: 10000 });
    
    // Buttons menüsüne tıkla
    await this.buttonsMenu.click();
    
    // URL'nin değiştiğini kontrol et
    await expect(this.page).toHaveURL(/\/buttons$/);
    
    // Sayfa tamamen yüklenmesini bekle
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Buttons sayfasının yüklendiğini kontrol et
    await expect(this.page.getByRole('heading', { name: 'Buttons' })).toBeVisible({ timeout: 10000 });
    
    // Buttons elementlerinin görünür olduğunu kontrol et
    await expect(this.doubleClickButton).toBeVisible({ timeout: 10000 });
    
    // Ek güvenlik için kısa bir bekleme
    await this.page.waitForTimeout(1000);
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