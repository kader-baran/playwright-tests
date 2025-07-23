# Backend Testleri

Bu klasör backend API testlerini içerir.

## Test Örnekleri

### API Endpoint Testleri

- GET istekleri
- POST istekleri
- PUT/PATCH istekleri
- DELETE istekleri

### Response Testleri

- Status code kontrolü
- Response body validasyonu
- Header kontrolü

### Error Handling Testleri

- 404 hataları
- 500 hataları
- Validation hataları

## Test Yazma Kuralları

1. Her test dosyası `.spec.ts` uzantısı ile bitmelidir
2. API endpoint'lerini doğru URL'lerle test edin
3. Response status code'larını kontrol edin
4. Test verilerini temizlemeyi unutmayın

## Örnek Test Yapısı

```typescript
import { test, expect } from "@playwright/test";

test.describe("API Testleri", () => {
  test("GET /api/users endpoint çalışır", async ({ request }) => {
    const response = await request.get("/api/users");
    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
  });
});
```

## Test Verileri

- Test verilerini `test-data/` klasöründe saklayın
- Her test için ayrı test verisi kullanın
- Test sonrası verileri temizleyin
