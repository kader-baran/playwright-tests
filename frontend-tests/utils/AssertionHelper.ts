import { Locator, expect, Page } from "@playwright/test";

// Test assertion'larını dinamik hale getiren yardımcı sınıf
export class AssertionHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Element görünürlük assertion'ları
  async expectElementVisible(locator: Locator, timeout = 10000) {
    await expect(locator).toBeVisible({ timeout });
  }

  async expectElementNotVisible(locator: Locator, timeout = 10000) {
    await expect(locator).not.toBeVisible({ timeout });
  }

  async expectElementHidden(locator: Locator, timeout = 10000) {
    await expect(locator).toBeHidden({ timeout });
  }

  async expectElementAttached(locator: Locator, timeout = 10000) {
    await expect(locator).toBeAttached({ timeout });
  }

  async expectElementDetached(locator: Locator, timeout = 10000) {
    await expect(locator).toBeAttached({ attached: false, timeout });
  }

  // Element durumu assertion'ları
  async expectElementEnabled(locator: Locator, timeout = 10000) {
    await expect(locator).toBeEnabled({ timeout });
  }

  async expectElementDisabled(locator: Locator, timeout = 10000) {
    await expect(locator).toBeDisabled({ timeout });
  }

  async expectElementChecked(locator: Locator, timeout = 10000) {
    await expect(locator).toBeChecked({ timeout });
  }

  async expectElementNotChecked(locator: Locator, timeout = 10000) {
    await expect(locator).not.toBeChecked({ timeout });
  }

  async expectElementFocused(locator: Locator, timeout = 10000) {
    await expect(locator).toBeFocused({ timeout });
  }

  // Element içerik assertion'ları
  async expectElementText(
    locator: Locator,
    expectedText: string,
    timeout = 10000
  ) {
    await expect(locator).toHaveText(expectedText, { timeout });
  }

  async expectElementTextContains(
    locator: Locator,
    expectedText: string,
    timeout = 10000
  ) {
    await expect(locator).toContainText(expectedText, { timeout });
  }

  async expectElementValue(
    locator: Locator,
    expectedValue: string,
    timeout = 10000
  ) {
    await expect(locator).toHaveValue(expectedValue, { timeout });
  }

  async expectElementAttribute(
    locator: Locator,
    attribute: string,
    expectedValue: string,
    timeout = 10000
  ) {
    await expect(locator).toHaveAttribute(attribute, expectedValue, {
      timeout,
    });
  }

  async expectElementClass(
    locator: Locator,
    expectedClass: string,
    timeout = 10000
  ) {
    await expect(locator).toHaveClass(new RegExp(expectedClass), { timeout });
  }

  // Sayfa assertion'ları
  async expectPageTitle(expectedTitle: string, timeout = 10000) {
    await expect(this.page).toHaveTitle(expectedTitle, { timeout });
  }

  async expectPageTitleContains(expectedText: string, timeout = 10000) {
    await expect(this.page).toHaveTitle(new RegExp(expectedText), { timeout });
  }

  async expectPageUrl(expectedUrl: string, timeout = 10000) {
    await expect(this.page).toHaveURL(expectedUrl, { timeout });
  }

  async expectPageUrlContains(expectedText: string, timeout = 10000) {
    await expect(this.page).toHaveURL(new RegExp(expectedText), { timeout });
  }

  // Form assertion'ları
  async expectFormFieldValue(
    locator: Locator,
    expectedValue: string,
    timeout = 10000
  ) {
    await expect(locator).toHaveValue(expectedValue, { timeout });
  }

  async expectFormFieldEmpty(locator: Locator, timeout = 10000) {
    await expect(locator).toHaveValue("", { timeout });
  }

  async expectFormFieldPlaceholder(
    locator: Locator,
    expectedPlaceholder: string,
    timeout = 10000
  ) {
    await expect(locator).toHaveAttribute("placeholder", expectedPlaceholder, {
      timeout,
    });
  }

  // Tablo assertion'ları
  async expectTableRowCount(
    tableLocator: Locator,
    expectedCount: number,
    timeout = 10000
  ) {
    const rows = tableLocator.locator("tr");
    await expect(rows).toHaveCount(expectedCount, { timeout });
  }

  async expectTableContainsText(
    tableLocator: Locator,
    expectedText: string,
    timeout = 10000
  ) {
    await expect(tableLocator).toContainText(expectedText, { timeout });
  }

  async expectTableRowExists(
    tableLocator: Locator,
    rowText: string,
    timeout = 10000
  ) {
    const row = tableLocator.locator(`tr:has-text("${rowText}")`);
    await expect(row).toBeVisible({ timeout });
  }

  // Liste assertion'ları
  async expectListContainsItem(
    listLocator: Locator,
    itemText: string,
    timeout = 10000
  ) {
    const item = listLocator.locator(`li:has-text("${itemText}")`);
    await expect(item).toBeVisible({ timeout });
  }

  async expectListItemCount(
    listLocator: Locator,
    expectedCount: number,
    timeout = 10000
  ) {
    const items = listLocator.locator("li");
    await expect(items).toHaveCount(expectedCount, { timeout });
  }

  // Modal/Dialog assertion'ları
  async expectModalVisible(modalTitle?: string, timeout = 10000) {
    if (modalTitle) {
      const modal = this.page.locator(
        `[role="dialog"]:has-text("${modalTitle}")`
      );
      await expect(modal).toBeVisible({ timeout });
    } else {
      const modal = this.page.locator('[role="dialog"]');
      await expect(modal).toBeVisible({ timeout });
    }
  }

  async expectModalNotVisible(modalTitle?: string, timeout = 10000) {
    if (modalTitle) {
      const modal = this.page.locator(
        `[role="dialog"]:has-text("${modalTitle}")`
      );
      await expect(modal).not.toBeVisible({ timeout });
    } else {
      const modal = this.page.locator('[role="dialog"]');
      await expect(modal).not.toBeVisible({ timeout });
    }
  }

  // Dropdown assertion'ları
  async expectDropdownOptionSelected(
    selectLocator: Locator,
    expectedOption: string,
    timeout = 10000
  ) {
    await expect(selectLocator).toHaveValue(expectedOption, { timeout });
  }

  async expectDropdownOptionText(
    selectLocator: Locator,
    expectedText: string,
    timeout = 10000
  ) {
    await expect(selectLocator).toHaveText(expectedText, { timeout });
  }

  // Dosya yükleme assertion'ları
  async expectFileUploaded(
    inputLocator: Locator,
    expectedFileName: string,
    timeout = 10000
  ) {
    await expect(inputLocator).toHaveValue(expectedFileName, { timeout });
  }

  // Hata mesajı assertion'ları
  async expectErrorMessageVisible(errorText: string, timeout = 10000) {
    const errorElement = this.page.locator(`text=${errorText}`);
    await expect(errorElement).toBeVisible({ timeout });
  }

  async expectSuccessMessageVisible(successText: string, timeout = 10000) {
    const successElement = this.page.locator(`text=${successText}`);
    await expect(successElement).toBeVisible({ timeout });
  }

  // Dinamik içerik assertion'ları
  async expectDynamicText(locator: Locator, pattern: RegExp, timeout = 10000) {
    await expect(locator).toHaveText(pattern, { timeout });
  }

  async expectDynamicAttribute(
    locator: Locator,
    attribute: string,
    pattern: RegExp,
    timeout = 10000
  ) {
    await expect(locator).toHaveAttribute(attribute, pattern, { timeout });
  }

  // Sayısal değer assertion'ları
  async expectNumericValue(
    locator: Locator,
    expectedValue: number,
    timeout = 10000
  ) {
    const text = await locator.textContent();
    const numericValue = parseFloat(text?.replace(/[^\d.-]/g, "") || "0");
    expect(numericValue).toBe(expectedValue);
  }

  async expectNumericValueGreaterThan(
    locator: Locator,
    minValue: number,
    timeout = 10000
  ) {
    const text = await locator.textContent();
    const numericValue = parseFloat(text?.replace(/[^\d.-]/g, "") || "0");
    expect(numericValue).toBeGreaterThan(minValue);
  }

  async expectNumericValueLessThan(
    locator: Locator,
    maxValue: number,
    timeout = 10000
  ) {
    const text = await locator.textContent();
    const numericValue = parseFloat(text?.replace(/[^\d.-]/g, "") || "0");
    expect(numericValue).toBeLessThan(maxValue);
  }

  // Tarih assertion'ları
  async expectDateValue(
    locator: Locator,
    expectedDate: string,
    timeout = 10000
  ) {
    await expect(locator).toHaveValue(expectedDate, { timeout });
  }

  async expectDateInRange(
    locator: Locator,
    startDate: string,
    endDate: string,
    timeout = 10000
  ) {
    const dateValue = await locator.inputValue();
    const date = new Date(dateValue);
    const start = new Date(startDate);
    const end = new Date(endDate);
    expect(date.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(date.getTime()).toBeLessThanOrEqual(end.getTime());
  }

  // Renk assertion'ları
  async expectElementColor(
    locator: Locator,
    expectedColor: string,
    timeout = 10000
  ) {
    const backgroundColor = await locator.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toContain(expectedColor.toLowerCase());
  }

  // Boyut assertion'ları
  async expectElementSize(
    locator: Locator,
    expectedWidth: number,
    expectedHeight: number,
    timeout = 10000
  ) {
    const box = await locator.boundingBox();
    expect(box?.width).toBe(expectedWidth);
    expect(box?.height).toBe(expectedHeight);
  }

  // Pozisyon assertion'ları
  async expectElementPosition(
    locator: Locator,
    expectedX: number,
    expectedY: number,
    timeout = 10000
  ) {
    const box = await locator.boundingBox();
    expect(box?.x).toBe(expectedX);
    expect(box?.y).toBe(expectedY);
  }

  // Çoklu element assertion'ları
  async expectAllElementsVisible(locators: Locator[], timeout = 10000) {
    for (const locator of locators) {
      await expect(locator).toBeVisible({ timeout });
    }
  }

  async expectAtLeastOneElementVisible(locators: Locator[], timeout = 10000) {
    let found = false;
    for (const locator of locators) {
      try {
        await expect(locator).toBeVisible({ timeout: 1000 });
        found = true;
        break;
      } catch {
        // Element bulunamadı, devam et
      }
    }
    expect(found).toBe(true);
  }

  // Koşullu assertion'lar
  async expectConditionalElement(
    locator: Locator,
    shouldBeVisible: boolean,
    timeout = 10000
  ) {
    if (shouldBeVisible) {
      await expect(locator).toBeVisible({ timeout });
    } else {
      await expect(locator).not.toBeVisible({ timeout });
    }
  }

  // Performans assertion'ları
  async expectPageLoadTime(maxLoadTime: number) {
    const startTime = Date.now();
    await this.page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(maxLoadTime);
  }
}
