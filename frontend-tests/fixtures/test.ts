import base, { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CheckboxPage } from "../pages/CheckboxPage";
import { RadioButtonPage } from "../pages/RadioButtonPage";
import { DropdownPage } from "../pages/DropdownPage";
import { FormPage } from "../pages/FormPage";
import { WebTablePage } from "../pages/WebTablePage";
import { IframePage } from "../pages/IframePage";
import { ShadowDomPage } from "../pages/ShadowDomPage";
import { DragAndDropPage } from "../pages/DragAndDropPage";
import { NotificationsPage } from "../pages/NotificationsPage";
import { JavaScriptAlertPage } from "../pages/JavaScriptAlertPage";

type Pages = {
  homePage: HomePage;
  checkboxPage: CheckboxPage;
  radioButtonPage: RadioButtonPage;
  dropdownPage: DropdownPage;
  formPage: FormPage;
  webTablePage: WebTablePage;
  iframePage: IframePage;
  shadowDomPage: ShadowDomPage;
  dragAndDropPage: DragAndDropPage;
  notificationsPage: NotificationsPage;
  javaScriptAlertPage: JavaScriptAlertPage;
};

const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  checkboxPage: async ({ page }, use) => {
    await use(new CheckboxPage(page));
  },
  radioButtonPage: async ({ page }, use) => {
    await use(new RadioButtonPage(page));
  },
  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },
  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },
  webTablePage: async ({ page }, use) => {
    await use(new WebTablePage(page));
  },
  iframePage: async ({ page }, use) => {
    await use(new IframePage(page));
  },
  shadowDomPage: async ({ page }, use) => {
    await use(new ShadowDomPage(page));
  },
  dragAndDropPage: async ({ page }, use) => {
    await use(new DragAndDropPage(page));
  },
  notificationsPage: async ({ page }, use) => {
    await use(new NotificationsPage(page));
  },
  javaScriptAlertPage: async ({ page }, use) => {
    await use(new JavaScriptAlertPage(page));
  },
});

export default test;
export { expect } from "@playwright/test";
