"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dragAndDropTestData = exports.searchTestData = exports.formTestData = exports.timeouts = exports.selectors = exports.baseTestData = void 0;
// Temel test verileri
exports.baseTestData = {
    url: 'https://the-internet.herokuapp.com/',
    expectedTitle: 'The Internet',
    timeout: 10000
};
// Selector'lar için temel yapı
exports.selectors = {
    // Genel selector'lar
    pageHeader: 'h1, h2, h3',
    button: 'button',
    link: 'a',
    input: 'input',
    form: 'form'
};
// Timeout değerleri
exports.timeouts = {
    short: 5000,
    medium: 10000,
    long: 30000
};
exports.formTestData = {
    firstName: 'kader',
    middleName: 'kader',
    lastName: 'baran',
    email: 'kader@getmobil.com',
    password: '123456',
    address: 'istanbul',
    city: 'kocaeli',
    state: 'izmit',
    pinCode: '1'
};
exports.searchTestData = [
    { searchTerm: '1', expectedResult: 'John Doe' },
    { searchTerm: 'rahul', expectedResult: 'Rahul' },
    { searchTerm: 'spain', expectedResult: 'Maria' }
];
exports.dragAndDropTestData = [
    { fromIndex: 0, toIndex: 1 }, // Item 1 to Item 2
    { fromIndex: 2, toIndex: 4 } // Item 3 to Item 5
];
