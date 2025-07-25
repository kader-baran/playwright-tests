import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  constructor(page: Page) {
    // Header için örnek bir selector
    super(page, 'header');
  }

  // Header'a özel bir metot: Logo'ya tıkla
  async clickLogo() {
    await this.page.locator('header .logo').click();
  }
} 