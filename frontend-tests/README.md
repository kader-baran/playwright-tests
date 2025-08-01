# Frontend Testleri

Bu klasör frontend testlerini içerir.

 npx playwright test frontend-tests/tests/practiceForm.spec.ts
  npx playwright test frontend-tests/tests/homePage.spec.ts    
   npx playwright test frontend-tests/tests/homePage.spec.ts --debug

## Test Örnekleri

### Form Testleri

- Form validasyonları
- Input alanları
- Submit işlemleri

### Sayfa Testleri

- Sayfa yüklenme
- Navigasyon
- UI elementleri

### Kullanıcı Etkileşimi Testleri

- Tıklama işlemleri
- Hover efektleri
- Drag & drop

## Test Yazma Kuralları

1. Her test dosyası `.spec.ts` uzantısı ile bitmelidir
2. Test isimleri açıklayıcı olmalıdır
3. Her test bağımsız çalışabilmelidir
4. Test verilerini temizlemeyi unutmayın

## Örnek Test Yapısı

```typescript
import { test, expect } from "@playwright/test";

test.describe("Sayfa Testleri", () => {
  test("ana sayfa yüklenir", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Ana Sayfa/);
  });
});
```

## Proje Yapısı ve POM (Page Object Model)

- `pages/` : Her bir sayfa için ayrı bir sınıf (ör: HomePage)
- `components/` : Tekrar kullanılabilir küçük parça objeler (ör: Header)
- `utils/` : Yardımcı fonksiyonlar
- `tests/` : Test dosyaları (ör: homePage.spec.ts)
- `fixtures/` : Test verileri (ör: users.json)

Her sayfa ve component, kendi dosyasında, testler ise ayrı bir klasörde tutulur. Böylece kodun bakımı ve genişletilmesi kolaylaşır.


________________________________________________________________________
-- branch oluşturacaksın o branch'te çalışacaksın.
1. FE POM Structure kurulacak.
2. Elementler için kontroller sağlanacak. clickMethodu olacak. sendKeys methodu gibigi
3. baseUrl: https://demoqa.com/
4. Chrome brpwser + headlessfalse