import { Page, Locator } from "@playwright/test";

// Element locator'larını dinamik hale getiren yardımcı sınıf
export class ElementHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Dinamik locator oluşturma metodları
  byText(text: string): Locator {
    return this.page.getByText(text);
  }

  byRole(role: string, options?: { name?: string; exact?: boolean }): Locator {
    return this.page.getByRole(role as any, options);
  }

  byLabel(label: string): Locator {
    return this.page.getByLabel(label);
  }

  byPlaceholder(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder);
  }

  byTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  byId(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  byClass(className: string): Locator {
    return this.page.locator(`.${className}`);
  }

  byXPath(xpath: string): Locator {
    return this.page.locator(`xpath=${xpath}`);
  }

  byCss(css: string): Locator {
    return this.page.locator(css);
  }

  // Dinamik içerik ile locator oluşturma
  byTextContains(text: string): Locator {
    return this.page.locator(`text=${text}`);
  }

  byAttribute(attribute: string, value: string): Locator {
    return this.page.locator(`[${attribute}="${value}"]`);
  }

  byAttributeContains(attribute: string, value: string): Locator {
    return this.page.locator(`[${attribute}*="${value}"]`);
  }

  // Form elementleri için özel metodlar
  byInputName(name: string): Locator {
    return this.page.locator(`input[name="${name}"]`);
  }

  byInputType(type: string): Locator {
    return this.page.locator(`input[type="${type}"]`);
  }

  byButtonText(text: string): Locator {
    return this.page.getByRole("button", { name: text });
  }

  byLinkText(text: string): Locator {
    return this.page.getByRole("link", { name: text });
  }

  // Tablo elementleri için özel metodlar
  byTableRow(index: number): Locator {
    return this.page.locator(`tr`).nth(index);
  }

  byTableCell(row: number, col: number): Locator {
    return this.page.locator(`tr`).nth(row).locator(`td`).nth(col);
  }

  byTableHeader(headerText: string): Locator {
    return this.page.locator(`th:has-text("${headerText}")`);
  }

  // List elementleri için özel metodlar
  byListItem(index: number): Locator {
    return this.page.locator(`li`).nth(index);
  }

  byListItemText(text: string): Locator {
    return this.page.locator(`li:has-text("${text}")`);
  }

  // Modal/Dialog elementleri için özel metodlar
  byModalTitle(title: string): Locator {
    return this.page.locator(`[role="dialog"]:has-text("${title}")`);
  }

  byModalContent(): Locator {
    return this.page.locator(`[role="dialog"]`);
  }

  // Dropdown elementleri için özel metodlar
  bySelectOption(value: string): Locator {
    return this.page.locator(`option[value="${value}"]`);
  }

  bySelectOptionText(text: string): Locator {
    return this.page.locator(`option:has-text("${text}")`);
  }

  // Checkbox/Radio elementleri için özel metodlar
  byCheckboxLabel(label: string): Locator {
    return this.page.locator(
      `input[type="checkbox"] + label:has-text("${label}")`
    );
  }

  byRadioLabel(label: string): Locator {
    return this.page.locator(
      `input[type="radio"] + label:has-text("${label}")`
    );
  }

  // Dinamik içerik ile filtreleme
  byParentWithText(parentSelector: string, childText: string): Locator {
    return this.page.locator(`${parentSelector}:has-text("${childText}")`);
  }

  byChildWithText(parentSelector: string, childText: string): Locator {
    return this.page.locator(`${parentSelector} *:has-text("${childText}")`);
  }

  // Index ile element seçimi
  byIndex(selector: string, index: number): Locator {
    return this.page.locator(selector).nth(index);
  }

  // Son element seçimi
  byLast(selector: string): Locator {
    return this.page.locator(selector).last();
  }

  // İlk element seçimi
  byFirst(selector: string): Locator {
    return this.page.locator(selector).first();
  }

  // Dinamik ID ile element seçimi
  byDynamicId(baseId: string, dynamicPart: string): Locator {
    return this.page.locator(`#${baseId}-${dynamicPart}`);
  }

  // Dinamik class ile element seçimi
  byDynamicClass(baseClass: string, dynamicPart: string): Locator {
    return this.page.locator(`.${baseClass}-${dynamicPart}`);
  }
}
