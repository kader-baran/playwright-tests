<<<<<<< HEAD
# Frontend Tests - Page Object Model (POM) Structure

Bu proje, Playwright kullanarak DemoQA sitesi için Page Object Model (POM) yapısında yazılmış frontend testlerini içerir.

## Proje Yapısı

```
frontend-tests/
├── pages/
│   ├── BasePage.ts          # Temel sayfa fonksiyonları
│   ├── HomePage.ts          # Ana sayfa işlemleri
│   ├── ElementsPage.ts      # Elements sayfası işlemleri
│   └── FormsPage.ts         # Forms sayfası işlemleri
├── data/
│   └── testData.ts          # Test verileri
├── tests/
│   └── demo.spec.ts         # POM yapısında yazılmış testler
└── README.md               # Bu dosya
```

## Page Object Model (POM) Yapısı

### BasePage
Tüm sayfa objelerinin temel sınıfı. Ortak fonksiyonları içerir:
- Navigasyon işlemleri
- Element görünürlük kontrolleri
- Form doldurma işlemleri
- Tıklama işlemleri
- Sayfa ölçeklendirme

### HomePage
Ana sayfa işlemleri:
- DemoQA ana sayfasına navigasyon
- Kart tıklama işlemleri (Elements, Forms, Widgets, vb.)
- Kart görünürlük kontrolleri

### ElementsPage
Elements sayfası işlemleri:
- TextBox form işlemleri
- CheckBox işlemleri
- Radio Button işlemleri
- Web Tables işlemleri
- Buttons işlemleri
- Links işlemleri

### FormsPage
Forms sayfası işlemleri:
- Practice Form işlemleri
- Form doldurma işlemleri
- Dropdown seçim işlemleri

## Test Verileri

`testData.ts` dosyasında tüm test verileri merkezi olarak yönetilir:
- TextBox form verileri
- Web Tables form verileri
- Practice Form verileri
- Beklenen mesajlar

## Test Çalıştırma

```bash
# Tüm testleri çalıştır
npx playwright test

# Belirli bir test dosyasını çalıştır
npx playwright test demo.spec.ts

# UI modunda çalıştır
npx playwright test --ui
```

## POM Avantajları

1. **Bakım Kolaylığı**: Element değişikliklerinde sadece page object'lerde güncelleme yapılır
2. **Kod Tekrarını Önleme**: Ortak fonksiyonlar BasePage'de tanımlanır
3. **Okunabilirlik**: Test kodları daha temiz ve anlaşılır
4. **Yeniden Kullanılabilirlik**: Page object'ler farklı testlerde kullanılabilir
5. **Merkezi Veri Yönetimi**: Test verileri tek yerden yönetilir

## Örnek Kullanım

```typescript
// Test dosyasında
test('TextBox testi', async () => {
  await homePage.navigateToHome();
  await homePage.clickElementsCard();
  await elementsPage.clickTextBoxCard();
  await elementsPage.fillTextBoxForm('test', 'test@test.com', 'address', 'address');
  await elementsPage.submitTextBoxForm();
  await elementsPage.expectTextBoxOutputVisible();
});
```

## Gelecek Geliştirmeler

- Widgets ve Interactions sayfaları için page object'ler eklenebilir
- API testleri için ayrı page object'ler oluşturulabilir
- Test raporlama ve screenshot alma fonksiyonları eklenebilir
- CI/CD entegrasyonu yapılabilir 
=======
# Frontend Testleri - POM (Page Object Model) Yapısı

Bu klasör, modern ve dinamik POM yapısı kullanarak frontend testlerini içerir.

## 🏗️ POM Yapısı

### 📁 Klasör Yapısı

```
frontend-tests/
├── pages/              # Sayfa sınıfları
│   ├── BasePage.ts     # Temel sayfa sınıfı
│   ├── HomePage.ts     # Ana sayfa sınıfı
│   └── ...            # Diğer sayfa sınıfları
├── utils/              # Yardımcı sınıflar
│   ├── TestBase.ts     # Test temel sınıfı
│   ├── ElementHelper.ts # Element yardımcısı
│   ├── TestDataHelper.ts # Test veri yardımcısı
│   ├── AssertionHelper.ts # Assertion yardımcısı
│   └── ...            # Diğer yardımcılar
├── components/         # Bileşen sınıfları
├── tests/             # Test dosyaları
├── fixtures/          # Test fixtures
└── playwright-report/ # Test raporları
```

## 🚀 Dinamik POM Özellikleri

### 1. **BasePage** - Temel Sayfa Sınıfı

- Tüm sayfa sınıfları için ortak metodlar
- Sayfa yükleme, navigasyon, element işlemleri
- Screenshot alma, scroll işlemleri
- Hata yakalama ve loglama

### 2. **ElementHelper** - Dinamik Element Yönetimi

- Dinamik locator oluşturma metodları
- Farklı element türleri için özel metodlar
- Tablo, liste, modal elementleri için yardımcılar
- Dinamik içerik ile element seçimi

### 3. **TestDataHelper** - Dinamik Test Verisi

- Faker.js ile gerçekçi test verisi oluşturma
- Kullanıcı, form, tablo verileri için özel metodlar
- Tarih, sayısal, metin verileri için yardımcılar
- Önceden tanımlanmış test senaryoları

### 4. **AssertionHelper** - Gelişmiş Assertion'lar

- Element görünürlük, durum kontrolü
- Sayfa, form, tablo assertion'ları
- Dinamik içerik, performans testleri
- Çoklu element ve koşullu assertion'lar

### 5. **TestBase** - Test Temel Sınıfı

- Tüm testler için ortak fonksiyonalite
- Test setup/cleanup metodları
- Navigasyon, form işlemleri
- Performans ve erişilebilirlik testleri

## 📝 Kullanım Örnekleri

### Sayfa Sınıfı Oluşturma

```typescript
import { BasePage } from "./BasePage";
import { ElementHelper } from "../utils/ElementHelper";

export class MyPage extends BasePage {
  private elementHelper: ElementHelper;

  constructor(page: Page) {
    super(page);
    this.elementHelper = new ElementHelper(page);
  }

  // Locator'ları tanımla
  private initializeLocators() {
    this.submitButton = this.elementHelper.byRole("button", { name: "Submit" });
    this.emailInput = this.elementHelper.byPlaceholder("Enter email");
  }

  // Sayfa metodları
  async fillForm(data: any) {
    await this.fillInput(this.emailInput, data.email);
    await this.clickElement(this.submitButton);
  }
}
```

### Test Dosyası Oluşturma

```typescript
import { test, expect } from "../utils/TestBase";
import { MyPage } from "../pages/MyPage";
import { TestDataHelper } from "../utils/TestDataHelper";

test.describe("MyPage Tests", () => {
  let myPage: MyPage;

  test.beforeEach(async ({ page }) => {
    myPage = new MyPage(page);
    await myPage.setupTest();
  });

  test("Form doldurma testi", async ({ page }) => {
    // Dinamik test verisi oluştur
    const formData = TestDataHelper.generateFormData();

    // Test işlemleri
    await myPage.goto();
    await myPage.fillForm(formData);

    // Assertion'lar
    await myPage.expectElementVisible(myPage.successMessage);
  });
});
```

## 🎯 Dinamik Özellikler

### Element Seçimi

```typescript
// Farklı yöntemlerle element seçimi
const element1 = elementHelper.byText("Submit");
const element2 = elementHelper.byRole("button", { name: "Submit" });
const element3 = elementHelper.byId("submit-btn");
const element4 = elementHelper.byClass("btn-primary");
const element5 = elementHelper.byAttribute("data-testid", "submit");
```

### Test Verisi Oluşturma

```typescript
// Dinamik test verisi
const userData = TestDataHelper.generateUserData();
const formData = TestDataHelper.generateFormData();
const tableData = TestDataHelper.generateTableData();

// Özel veri oluşturma
const randomEmail = TestDataHelper.generateTextData().randomEmail();
const randomNumber = TestDataHelper.generateNumericData().randomNumber(1, 100);
```

### Assertion'lar

```typescript
// Gelişmiş assertion'lar
await assertionHelper.expectElementVisible(locator);
await assertionHelper.expectElementText(locator, "Expected Text");
await assertionHelper.expectNumericValue(locator, 100);
await assertionHelper.expectDateInRange(locator, "2024-01-01", "2024-12-31");
```

## 🔧 Konfigürasyon

### Playwright Config

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: "./frontend-tests",
  use: {
    baseURL: "https://demoqa.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
```

### Test Çalıştırma

```bash
# Tüm frontend testleri
npm run test:frontend

# Belirli test dosyası
npm run test:frontend tests/homePage.spec.ts

# UI modunda
npm run test:ui

# Debug modunda
npm run test:debug-frontend
```

## 📊 Test Raporlama

### HTML Rapor

```bash
npm run report
```

### Screenshot'lar

- Test başarısız olduğunda otomatik screenshot
- Manuel screenshot alma: `await page.screenshot()`
- Screenshot'lar `test-results/` klasöründe saklanır

## 🎨 Best Practices

### 1. **Sayfa Sınıfları**

- Her sayfa için ayrı sınıf oluştur
- BasePage'den extend et
- Locator'ları private metodda initialize et
- Sayfa-spesifik metodları ekle

### 2. **Test Dosyaları**

- TestBase'den import et
- beforeEach'te setup yap
- Dinamik test verisi kullan
- Açıklayıcı test isimleri kullan

### 3. **Element Seçimi**

- Önce semantic locator'ları dene (byRole, byText)
- Sonra ID, class, attribute kullan
- XPath'i son çare olarak kullan
- Test ID'leri ekle

### 4. **Assertion'lar**

- Spesifik assertion'lar kullan
- Timeout değerlerini ayarla
- Çoklu assertion'ları birleştir
- Hata mesajlarını açıklayıcı yap

### 5. **Test Verisi**

- Her test için dinamik veri oluştur
- Test verilerini temizle
- Boundary değerleri test et
- Negatif test senaryoları ekle

## 🚨 Hata Yönetimi

### Try-Catch Blokları

```typescript
try {
  await page.click("#non-existent-element");
} catch (error) {
  await page.screenshot({ path: "error-screenshot.png" });
  throw error;
}
```

### Custom Error Handling

```typescript
async handleTestError(error: Error, context: string) {
  console.error(`Error in ${context}:`, error.message);
  await this.takeScreenshot(`error-${context}-${Date.now()}`);
  throw error;
}
```

## 📈 Performans Testleri

### Sayfa Yükleme Süresi

```typescript
const loadTime = await testBase.measurePageLoadTime();
expect(loadTime).toBeLessThan(3000); // 3 saniyeden az
```

### Network İstekleri

```typescript
await page.waitForResponse((response) => response.url().includes("/api/data"));
```

## ♿ Erişilebilirlik Testleri

### ARIA Etiketleri

```typescript
await expect(page.locator("[aria-label]")).toBeVisible();
await expect(page.locator('[role="button"]')).toBeEnabled();
```

### Klavye Navigasyonu

```typescript
await page.keyboard.press("Tab");
await expect(page.locator(":focus")).toBeVisible();
```

Bu POM yapısı, modern test otomasyonu için gerekli tüm dinamik özellikleri sağlar ve sürdürülebilir test kodları yazmanıza yardımcı olur.
>>>>>>> 8548971d4fddb30d74cac23cf8706e107711b8fe
