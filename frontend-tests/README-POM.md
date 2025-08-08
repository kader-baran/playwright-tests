# Page Object Model (POM) Yapısı

Bu proje, Playwright test otomasyonu için Page Object Model (POM) tasarım desenini kullanmaktadır.

## POM Yapısının Avantajları

### 1. **Kod Tekrarını Azaltır**
- Element locator'ları tek bir yerde tanımlanır
- Aynı elementler farklı testlerde tekrar yazılmaz

### 2. **Bakım Kolaylığı**
- UI değişikliklerinde sadece Page Object'lerde güncelleme yapılır
- Test dosyaları etkilenmez

### 3. **Okunabilirlik**
- Test dosyaları daha temiz ve anlaşılır
- İş mantığı ile UI etkileşimleri ayrılır

### 4. **Yeniden Kullanılabilirlik**
- Page Object'ler farklı testlerde kullanılabilir
- Ortak fonksiyonlar tekrar yazılmaz

## Proje Yapısı

```
frontend-tests/
├── pages/                    # Page Object'ler
│   ├── HomePage.ts          # Ana sayfa
│   ├── CheckboxPage.ts      # Checkbox sayfası
│   ├── RadioButtonPage.ts   # Radio Button sayfası
│   ├── DropdownPage.ts      # Dropdown sayfası
│   ├── FormPage.ts          # Form sayfası
│   ├── WebTablePage.ts      # Web Table sayfası
│   ├── IframePage.ts        # Iframe sayfası
│   ├── ShadowDomPage.ts     # Shadow DOM sayfası
│   ├── DragAndDropPage.ts   # Drag & Drop sayfası
│   ├── NotificationsPage.ts # Notifications sayfası
│   └── JavaScriptAlertPage.ts # JavaScript Alert sayfası
├── data/
│   └── testData.ts          # Test verileri
└── tests/
    └── site-load.spec.ts    # Ana test dosyası
```

## Page Object Örneği

```typescript
export class FormPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstname');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async fillForm(formData: FormData) {
    await this.firstNameInput.fill(formData.firstName);
    // ... diğer alanlar
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
```

## Test Dosyası Örneği

```typescript
test('Form test', async ({ page }) => {
  const formPage = new FormPage(page);
  
  await formPage.fillForm(testData);
  await formPage.submitForm();
});
```

## Test Verileri

Test verileri `data/testData.ts` dosyasında merkezi olarak yönetilir:

```typescript
export const formTestData = {
  firstName: 'kader',
  lastName: 'baran',
  email: 'kader@getmobil.com'
};
```

## Çalıştırma

```bash
# Tüm testleri çalıştır
npx playwright test

# Headed modda çalıştır
npx playwright test --headed

# Belirli test dosyasını çalıştır
npx playwright test site-load.spec.ts
```

## Faydalar

1. **Modüler Yapı**: Her sayfa için ayrı Page Object
2. **Merkezi Veri Yönetimi**: Test verileri tek dosyada
3. **Kolay Bakım**: UI değişikliklerinde sadece Page Object'ler güncellenir
4. **Temiz Kod**: Test dosyaları sadece iş mantığını içerir
5. **Yeniden Kullanılabilirlik**: Page Object'ler farklı testlerde kullanılabilir

## Önceki Yapı ile Karşılaştırma

### Önceki Yapı (Monolitik)
```typescript
// Test dosyasında tüm locator'lar ve işlemler
const firstNameInput = page.locator('#firstname');
await firstNameInput.fill('kader');
```

### POM Yapısı
```typescript
// Page Object'te tanımlı metodlar
await formPage.fillForm(testData);
```

Bu yapı sayesinde testler daha sürdürülebilir, okunabilir ve bakımı kolay hale gelmiştir. 