# Backend API Tests (POM)

PetStore API uçlarını Page Object Model (POM) ile test eder. Typed fixtures ile Page Object’ler testlere otomatik enjekte edilir. Renkli ve süreli loglama dahildir.

## Klasör Yapısı

```
backend-tests/
├── base/         # Ortak HTTP & assertion yardımcıları (ApiBasePage)
├── model/        # API Page Object'leri (Pet/Store/User)
├── fixtures/     # Typed fixtures (petApi/storeApi/userApi)
├── tests/        # Spec dosyaları
├── const/        # Test verileri (JSON)
├── config/       # Playwright config
└── utils/        # Logger
```

## POM Bileşenleri

- ApiBasePage: GET/POST/PUT/DELETE, `expectStatus`, `expectStatusOneOf`, `expectSuccess/Error`, `retryUntil`
- PetApiPage, StoreApiPage, UserApiPage: uç nokta çağrıları + doğrulamalar + örnek veri üretimi
- Fixtures: `fixtures/apiFixtures.ts` ile `petApi`, `storeApi`, `userApi` otomatik sağlanır

Örnek kullanım (test dosyası):

```ts
import test, { expect } from "../fixtures/apiFixtures";

test("Pet oluşturma", async ({ petApi }) => {
  const petData = petApi.createTestData();
  const res = await petApi.createPet(petData);
  await petApi.verifyPetCreated(res, petData);
});
```

## Çalıştırma

```bash
# Tüm backend testleri
npm run test:backend

# Belirli dosyalar
npm run test:pet
npm run test:store
npm run test:user

# HTML raporu
npm run report
```

Config: `backend-tests/config/playwright.config.ts`

## Loglama

- Güzel/renkli tek satır log: METHOD URL STATUS (ms)
- Env değişkenleri:
  - `LOG_LEVEL=info|warn|error|silent`
  - `LOG_BODY=1` (istek gövdelerini kısaltarak gösterir)

Örnek:

```bash
LOG_LEVEL=info LOG_BODY=1 npm run test:backend
```

## Notlar

- PetStore servisinde 404/200 tutarsızlıkları görülebilir. İlgili doğrulamalarda tolerant kontroller (200/404 kabul) uygulanmıştır.
