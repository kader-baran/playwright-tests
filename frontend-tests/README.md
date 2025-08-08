# Frontend Tests - POM Structure

Bu klasör, Page Object Model (POM) yapısına uygun frontend testlerini içerir.

## 📁 Klasör Yapısı

```
frontend-tests/
├── pages/            # Page Object sınıfları (POM)
├── tests/            # Spec dosyaları (örn: TC_01_checkbox.spec.ts)
├── data/             # Test verileri
├── config/           # Playwright konfigürasyonu
├── fixtures/         # Typed test fixture'ları (POM enjekte eder)
├── utils/            # Yardımcılar (örn: Logger)
└── reporters/        # Özel raporlayıcılar (özet konsol çıktısı)
```

## 🏗️ POM Yapısı

### Pages

- **BasePage.ts**: Tüm sayfa sınıflarının temel sınıfı (eklendi)
- Diğer sayfa sınıfları BasePage'den extend eder

### Tests

- Her test dosyası POM yapısına uygun yazılır
- Test dosyaları `*.spec.ts` uzantısına sahiptir

### Data

- **testData.ts**: Merkezi test verileri
- Interface'ler ve sabitler

### Config

- **playwright.config.ts**: Playwright konfigürasyonu

### Utils

- **Logger.ts**: Renkli ve zaman damgalı adım logları (`Logger.info/warn/error`)

### Fixtures

- **fixtures/test.ts**: POM sınıflarını otomatik sağlayan typed fixture

## 🚀 Kullanım

### Test Çalıştırma

Root dizinden aşağıdaki komutları kullanın:

```bash
# Tüm frontend testleri (headless)
npm run test:frontend

# Headed (tarayıcı penceresi açık)
npm run test:frontend -- --headed

# Debug mod (Inspector)
npm run test:debug-frontend

# UI modu (spec seçerek çalıştırma)
npx playwright test --ui --config=frontend-tests/config/playwright.config.ts

# Belirli bir dosya
npx playwright test frontend-tests/tests/TC_01_checkbox.spec.ts \
  --config=frontend-tests/config/playwright.config.ts

# Test adında filtreleme (grep)
npx playwright test --config=frontend-tests/config/playwright.config.ts \
  --grep "Dropdown akışı"

# HTML raporu açma
npx playwright show-report
```

### Yeni Test Ekleme

1. `pages/` klasörüne yeni Page Object sınıfı ekle
2. `tests/` klasörüne yeni test dosyası ekle
3. `data/` klasörüne gerekli test verilerini ekle

## 📋 Test Kategorileri

- **Navigation Tests**: Sayfa navigasyon testleri
- **UI Tests**: Kullanıcı arayüzü testleri
- **Functional Tests**: Fonksiyonel testler
- **Performance Tests**: Performans testleri

## 🔧 Konfigürasyon

- **Base URL**: https://testing.qaautomationlabs.com
- **Browsers**: Chrome, Firefox, Safari
- **Timeout**: 10 saniye (varsayılan)
- **Retries**: CI'da 2, local'de 0

## 📊 Raporlama

- **HTML Report**: Otomatik oluşturulur
- **Screenshots**: Sadece hata durumunda
- **Videos**: Sadece hata durumunda
- **Traces**: İlk retry'da
- **Konsol Özeti**: `reporters/summary-reporter.js` ile toplam/passed/failed/skipped, pass/fail oranları ve toplam süre yazdırılır
- **Adım Logları**: POM metotlarında `Logger.info(...)` ile renkli adım logları
