# Frontend Testleri

Bu klasör frontend testlerini içerir.

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
