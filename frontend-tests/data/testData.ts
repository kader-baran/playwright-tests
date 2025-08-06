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