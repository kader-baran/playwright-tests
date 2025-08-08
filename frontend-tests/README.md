# Frontend Tests - POM Structure

Bu klasör, Page Object Model (POM) yapısına uygun frontend testlerini içerir.

## 📁 Klasör Yapısı

```
frontend-tests/
├── pages/           # Page Object sınıfları
├── tests/           # Test dosyaları
├── data/            # Test verileri
├── config/          # Konfigürasyon dosyaları
├── utils/           # Yardımcı fonksiyonlar
└── fixtures/        # Test fixture'ları
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

- **TestHelper.ts**: Ortak test yardımcı fonksiyonları

### Fixtures

- **fixtures/test.ts**: POM sınıflarını otomatik sağlayan typed fixture

## 🚀 Kullanım

### Test Çalıştırma

```bash
# Tüm testleri çalıştır
npx playwright test --headed

# Belirli test dosyasını çalıştır
npx playwright test tests/example.spec.ts --headed

# Debug modunda çalıştır
npx playwright test --debug
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
