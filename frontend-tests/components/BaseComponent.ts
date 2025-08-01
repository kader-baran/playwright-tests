import { Page, Locator } from '@playwright/test';

// Tüm componentler için ortak metodları içeren temel sınıf
export class BaseComponent {
  protected page: Page;
  protected root: Locator;

  constructor(page: Page, rootSelector: string) {
    this.page = page;
    this.root = page.locator(rootSelector);
  }

  // Ortak: componentin görünür olup olmadığını kontrol et
  async isVisible() {
    return this.root.isVisible();
  }

  // Ortak: componentin tıklanabilir olup olmadığını kontrol et
  async isEnabled() {
    return this.root.isEnabled();
  }

  // Ortak: componentin metnini al
  async getText() {
    return this.root.textContent();
  }

  // Ortak: componente tıkla
  async click() {
    await this.root.click();
  }
} 