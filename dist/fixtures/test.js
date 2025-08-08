"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = void 0;
const test_1 = __importDefault(require("@playwright/test"));
const HomePage_1 = require("../pages/HomePage");
const CheckboxPage_1 = require("../pages/CheckboxPage");
const RadioButtonPage_1 = require("../pages/RadioButtonPage");
const DropdownPage_1 = require("../pages/DropdownPage");
const FormPage_1 = require("../pages/FormPage");
const WebTablePage_1 = require("../pages/WebTablePage");
const IframePage_1 = require("../pages/IframePage");
const ShadowDomPage_1 = require("../pages/ShadowDomPage");
const DragAndDropPage_1 = require("../pages/DragAndDropPage");
const NotificationsPage_1 = require("../pages/NotificationsPage");
const JavaScriptAlertPage_1 = require("../pages/JavaScriptAlertPage");
const test = test_1.default.extend({
    homePage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new HomePage_1.HomePage(page));
    }),
    checkboxPage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new CheckboxPage_1.CheckboxPage(page));
    }),
    radioButtonPage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new RadioButtonPage_1.RadioButtonPage(page));
    }),
    dropdownPage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new DropdownPage_1.DropdownPage(page));
    }),
    formPage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new FormPage_1.FormPage(page));
    }),
    webTablePage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new WebTablePage_1.WebTablePage(page));
    }),
    iframePage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new IframePage_1.IframePage(page));
    }),
    shadowDomPage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new ShadowDomPage_1.ShadowDomPage(page));
    }),
    dragAndDropPage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new DragAndDropPage_1.DragAndDropPage(page));
    }),
    notificationsPage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new NotificationsPage_1.NotificationsPage(page));
    }),
    javaScriptAlertPage: (_a, use_1) => __awaiter(void 0, [_a, use_1], void 0, function* ({ page }, use) {
        yield use(new JavaScriptAlertPage_1.JavaScriptAlertPage(page));
    }),
});
exports.default = test;
var test_2 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_2.expect; } });
