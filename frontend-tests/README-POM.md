# Page Object Model (POM) Rehberi

Bu proje, Playwright ile frontend test otomasyonu için Page Object Model (POM) tasarım desenini kullanır. Hedef; okunabilir, sürdürülebilir, yeniden kullanılabilir ve bakımı kolay testler üretmektir.

## 🎯 İlkeler

- Tek sorumluluk: Her Page sınıfı yalnızca kendi sayfasının davranışlarını kapsar
- Soyutlama: Locator ve akış mantığı testlerden ayrılır, testler iş senaryosu odaklı kalır
- Yeniden kullanılabilirlik: Ortak davranışlar `BasePage` ve yardımcı yapılara taşınır
- Stabil locator: Rol/erişilebilirlik (`getByRole`) ve `data-testid` önceliklidir
- Açıklayıcı loglama: Her adımda `Logger.info(...)` ile net loglar

## 📁 Klasör Yapısı

```
frontend-tests/
├── pages/                 # Page Object sınıfları (POM)
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── CheckboxPage.ts
│   ├── RadioButtonPage.ts
│   ├── DropdownPage.ts
│   ├── FormPage.ts
│   ├── WebTablePage.ts
│   ├── IframePage.ts
│   ├── ShadowDomPage.ts
│   ├── DragAndDropPage.ts
│   ├── NotificationsPage.ts
│   └── JavaScriptAlertPage.ts
├── fixtures/
│   └── test.ts            # Typed fixtures: POM nesnelerini testlere enjekte eder
├── tests/                  # Odaklı spec dosyaları (TC_**_*.spec.ts)
├── data/
│   └── testData.ts        # Test verileri
├── utils/
│   └── Logger.ts          # Renkli, zaman damgalı adım logları (chalk)
└── reporters/
    └── summary-reporter.js # Konsol özeti (pass/fail oranları, süre)
```

## 🧱 BasePage (Temel Sınıf)

Tüm sayfa sınıfları `BasePage`'den extend eder; ortak davranışları içerir:

- `waitForPageLoad()`, `gotoPath(path)`
- `expectVisible(locator)`, `click(locator)`, `type(locator, value)`
- Her adım başında `Logger.info(...)` ile loglama

Kullanım: Page sınıfı ctor'unda `super(page)` çağrılır.

## 📄 Page Sınıfı Tasarımı

- `readonly` locator alanları (ör. `readonly pageTitle = page.locator('h1:has-text("...")')`)
- Tek amaçlı, anlamlı metotlar (ör. `selectCountry`, `verifyResult`)
- Her metotta görünürlük doğrulaması ve ardından aksiyon + doğrulama
- Metot başına adım logu (`Logger.info('...')`)

Örnek iskelet:

```ts
export class ExamplePage extends BasePage {
  readonly header = this.page.locator('h1:has-text("Example")');

  async verifyPageLoaded() {
    Logger.info("Verify Example page loaded");
    await expect(this.header).toBeVisible();
  }
}
```

## 🎭 Locator Stratejisi (Önerilen)

1. `getByRole`/erişilebilirlik tabanlı locator'lar (en stabil)
2. `data-testid` / `data-test` gibi özel attribute'lar
3. Gerekirse id/class ile CSS locator'lar
4. En son XPath (spesifik ve kısa tutun)

Not: Dinamik metinlere bağımlılığı azaltın, değişime dayanıklı eşleşmeleri tercih edin.

## ✅ Doğrulama (Assertions)

- Kritik adımlarda `await expect(...).toBeVisible()/toHaveText()`
- Akış doğrulamalarında `verify*` isimlendirme standardı
- Sayfa yüklenmesi için `verifyPageLoaded()` kullanımı

## 🧰 Fixtures ile POM Enjeksiyonu

`fixtures/test.ts` tüm Page Object’leri typed fixture olarak testlere sağlar:

```ts
import test from "../fixtures/test";

test("Örnek", async ({ homePage, formPage }) => {
  await homePage.goto();
  await formPage.verifyPageLoaded();
});
```

Avantaj: Otomatik oluşum, tip güvenliği, daha temiz spec dosyaları.

## 🧪 Spec Yazım Rehberi

- Küçük, odaklı ve bağımsız spec’ler (tek özelliği test et)
- Adlandırma: `TC_01_checkbox.spec.ts` gibi sıralı ve anlaşılır
- Akış: `Home -> Feature -> Verify` şeklinde açık adımlar
- Tekrarlayan akışları Page metotlarına taşıyın

## 📝 Loglama ve Raporlama

- Her adım `Logger.info(...)` ile renkli (chalk) ve timestamp’li loglanır
- Konsol sonunda özet: toplam, passed/failed/skipped, pass/fail oranları, toplam süre (`summary-reporter.js`)

## 🔧 Çalıştırma

Root dizinden:

```bash
# Tüm frontend testleri (headless)
npm run test:frontend

# Headed (tarayıcı açık)
npm run test:frontend -- --headed

# UI modu (spec seçerek)
npx playwright test --ui --config=frontend-tests/config/playwright.config.ts

# Belirli bir dosya
npx playwright test frontend-tests/tests/TC_01_checkbox.spec.ts \
  --config=frontend-tests/config/playwright.config.ts

# HTML raporu
npx playwright show-report
```

## ♻️ Bakım İpuçları

- UI değişikliklerinde sadece ilgili Page Object güncellenir
- Ortak metotlar/yardımcılar `BasePage` veya `utils` altına taşınır
- Flakiness azaltmak için: stabil locator, görünürlük bekleme, minimal timing bağımlılığı

Bu POM yaklaşımı ile testler daha sürdürülebilir, okunabilir ve genişletilebilir olur.
