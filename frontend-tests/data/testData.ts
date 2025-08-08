// Test verileri için temel interface'ler
export interface TestData {
  url: string;
  expectedTitle: string;
  timeout: number;
}

// Temel test verileri
export const baseTestData: TestData = {
  url: 'https://the-internet.herokuapp.com/',
  expectedTitle: 'The Internet',
  timeout: 10000
};

// Selector'lar için temel yapı
export const selectors = {
  // Genel selector'lar
  pageHeader: 'h1, h2, h3',
  button: 'button',
  link: 'a',
  input: 'input',
  form: 'form'
};

// Timeout değerleri
export const timeouts = {
  short: 5000,
  medium: 10000,
  long: 30000
};

export const formTestData = {
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

export const searchTestData = [
  { searchTerm: '1', expectedResult: 'John Doe' },
  { searchTerm: 'rahul', expectedResult: 'Rahul' },
  { searchTerm: 'spain', expectedResult: 'Maria' }
];

export const dragAndDropTestData = [
  { fromIndex: 0, toIndex: 1 }, // Item 1 to Item 2
  { fromIndex: 2, toIndex: 4 }  // Item 3 to Item 5
]; 