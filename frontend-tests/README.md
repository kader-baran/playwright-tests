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