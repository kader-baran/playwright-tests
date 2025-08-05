export interface UserData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ProductData {
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

// Test kullanıcı verileri
export const testUsers: UserData[] = [
  {
    username: 'testuser1',
    email: 'testuser1@example.com',
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User'
  },
  {
    username: 'testuser2',
    email: 'testuser2@example.com',
    password: 'TestPassword456!',
    firstName: 'John',
    lastName: 'Doe'
  }
];

// Test ürün verileri
export const testProducts: ProductData[] = [
  {
    name: 'Test Product 1',
    price: 99.99,
    description: 'This is a test product description',
    category: 'Electronics'
  },
  {
    name: 'Test Product 2',
    price: 149.99,
    description: 'Another test product description',
    category: 'Clothing'
  }
];

// Test form verileri
export const testFormData: FormData[] = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message',
    phone: '+1234567890'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    message: 'Another test message',
    phone: '+0987654321'
  }
];

// URL'ler
export const URLs = {
  home: '/',
  login: '/login',
  register: '/register',
  products: '/products',
  contact: '/contact',
  about: '/about'
};

// Beklenen sayfa başlıkları
export const pageTitles = {
  home: 'Home - Example Site',
  login: 'Login - Example Site',
  register: 'Register - Example Site',
  products: 'Products - Example Site',
  contact: 'Contact - Example Site',
  about: 'About - Example Site'
};

// Test mesajları
export const testMessages = {
  loginSuccess: 'Login successful',
  loginError: 'Invalid credentials',
  registerSuccess: 'Registration successful',
  formSubmitSuccess: 'Form submitted successfully',
  productAdded: 'Product added to cart',
  productRemoved: 'Product removed from cart'
};

// CSS Selector'ları
export const selectors = {
  // Navigation
  navMenu: '.nav-menu',
  navLogo: '.nav-logo',
  navLinks: '.nav-link',
  
  // Forms
  loginForm: '#login-form',
  registerForm: '#register-form',
  contactForm: '#contact-form',
  
  // Buttons
  submitButton: 'button[type="submit"]',
  loginButton: '#login-btn',
  registerButton: '#register-btn',
  
  // Input fields
  usernameInput: '#username',
  emailInput: '#email',
  passwordInput: '#password',
  confirmPasswordInput: '#confirm-password',
  
  // Messages
  successMessage: '.success-message',
  errorMessage: '.error-message',
  alertMessage: '.alert',
  
  // Products
  productCard: '.product-card',
  productTitle: '.product-title',
  productPrice: '.product-price',
  addToCartButton: '.add-to-cart-btn',
  
  // Cart
  cartIcon: '.cart-icon',
  cartItems: '.cart-items',
  cartTotal: '.cart-total',
  
  // Footer
  footer: '.footer',
  footerLinks: '.footer-link'
};

// Test timeout değerleri
export const timeouts = {
  short: 5000,
  medium: 10000,
  long: 20000,
  veryLong: 30000
}; 