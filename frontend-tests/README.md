# Frontend Testleri

Bu klasör, Playwright kullanarak frontend testleri için organize edilmiş yapıyı içerir.

## Klasör Yapısı

```
frontend-tests/
├── config/
│   └── playwright.config.ts    # Frontend testleri için Playwright config
├── pages/
│   └── BasePage.ts            # Temel sayfa sınıfı
├── tests/
│   └── homePage.spec.ts       # Ana sayfa testleri
├── data/
│   └── testData.ts           # Test verileri ve selector'lar
├── utils/
│   └── TestHelper.ts         # Yardımcı fonksiyonlar
└── fixtures/                 # Test fixture'ları
```

## Özellikler

### 🏗️ **Page Object Model (POM)**
- `BasePage.ts`: Tüm sayfalar için ortak metodlar
- Modüler ve yeniden kullanılabilir yapı

### 📊 **Test Data Management**
- `testData.ts`: Merkezi test verisi yönetimi
- Interface'ler ile tip güvenliği
- Selector'lar için merkezi yönetim

### 🛠️ **Test Helper Functions**
- `TestHelper.ts`: Gelişmiş yardımcı fonksiyonlar
- Rastgele veri oluşturma
- Element bekleme ve doğrulama metodları

### 🎯 **Test Categories**
- **Page Load Tests**: Sayfa yükleme kontrolü
- **Navigation Tests**: Navigasyon işlevselliği
- **Content Verification**: İçerik doğrulama
- **User Interactions**: Kullanıcı etkileşimleri
- **Responsive Design**: Responsive tasarım testleri
- **Performance**: Performans testleri
- **Accessibility**: Erişilebilirlik testleri

## Kullanım

### Test Çalıştırma

```bash
# Tüm frontend testleri
npm run test:frontend

# Debug modunda
npm run test:debug-frontend

# UI modunda
npx playwright test --config=frontend-tests/config/playwright.config.ts --ui
```

### Yeni Test Ekleme

1. **Page Object Oluşturma**:
```typescript
// pages/LoginPage.ts
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.fillElement(this.page.locator('#username'), username);
    await this.fillElement(this.page.locator('#password'), password);
    await this.clickElement(this.page.locator('#login-btn'));
  }
}
```

2. **Test Dosyası Oluşturma**:
```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/login');
    await loginPage.login('testuser', 'password');
    // Assertions...
  });
});
```

3. **Test Data Ekleme**:
```typescript
// data/testData.ts
export const loginData = {
  validUser: { username: 'testuser', password: 'password' },
  invalidUser: { username: 'wrong', password: 'wrong' }
};
```

## Config Ayarları

### Browser Desteği
- **Chromium**: Varsayılan browser
- **Firefox**: Cross-browser testing
- **WebKit**: Safari testing

### Timeout Ayarları
- **Page Load**: 60 saniye
- **Element Wait**: 15 saniye
- **Action Timeout**: 20 saniye

### Screenshot ve Video
- **Screenshot**: Sadece hata durumunda
- **Video**: Sadece hata durumunda
- **Trace**: İlk retry'da

## Best Practices

### ✅ Doğru Yaklaşımlar
- Page Object Model kullanın
- Test verilerini merkezi yönetin
- Explicit wait kullanın
- Descriptive test isimleri yazın
- Test'leri bağımsız tutun

### ❌ Kaçınılması Gerekenler
- Hard-coded selector'lar kullanmayın
- Sleep kullanmayın
- Test'leri birbirine bağımlı yapmayın
- Karmaşık test senaryoları yazmayın

## Örnek Test Senaryoları

### 1. Form Validation
```typescript
test('should validate form fields', async ({ page }) => {
  const form = page.locator('#contact-form');
  
  // Boş form gönderimi
  await form.locator('button[type="submit"]').click();
  await expect(page.locator('.error-message')).toBeVisible();
  
  // Geçerli veri ile form gönderimi
  await form.locator('#name').fill('John Doe');
  await form.locator('#email').fill('john@example.com');
  await form.locator('button[type="submit"]').click();
  await expect(page.locator('.success-message')).toBeVisible();
});
```

### 2. Responsive Testing
```typescript
test('should work on mobile devices', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Mobile menu'nun çalıştığını kontrol et
  await page.locator('.mobile-menu-toggle').click();
  await expect(page.locator('.mobile-menu')).toBeVisible();
});
```

### 3. Performance Testing
```typescript
test('should load within performance budget', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000); // 3 saniye
});
```

## Debug ve Troubleshooting

### Debug Modunda Çalıştırma
```bash
npm run test:debug-frontend
```

### Screenshot Alma
```typescript
await page.screenshot({ path: 'debug-screenshot.png' });
```

### Console Log'ları
```typescript
page.on('console', msg => console.log('Browser log:', msg.text()));
```

## CI/CD Entegrasyonu

### GitHub Actions
```yaml
- name: Run Frontend Tests
  run: npm run test:frontend
```

### Parallel Execution
```bash
npx playwright test --workers=4
```

Bu yapı ile modern, sürdürülebilir ve ölçeklenebilir frontend testleri yazabilirsiniz! 🚀 