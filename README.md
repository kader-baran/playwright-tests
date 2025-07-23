# Playwright Test Projesi

Bu proje, stajyer için hazırlanmış frontend ve backend testlerini içeren Playwright test projesidir.

## Proje Yapısı

```
playwright-tests/
├── frontend-tests/     # Frontend testleri
├── backend-tests/      # Backend testleri
├── test-results/       # Test sonuçları
├── playwright.config.ts
├── package.json
└── README.md
```

## Kurulum

```bash
npm install
```

## Test Çalıştırma

### Tüm testleri çalıştır

```bash
npm test
```

### Sadece frontend testleri

```bash
npm run test:frontend
```

### Sadece backend testleri

```bash
npm run test:backend
```

### Tarayıcıda görünür şekilde çalıştır

```bash
npm run test:headed
```

### UI modunda çalıştır

```bash
npm run test:ui
```

### Test raporunu görüntüle

```bash
npm run report
```

## Test Yazma Rehberi

### Frontend Testleri

- `frontend-tests/` klasörü altında yazılır
- UI elementleri test edilir
- Kullanıcı etkileşimleri simüle edilir

### Backend Testleri

- `backend-tests/` klasörü altında yazılır
- API endpoint'leri test edilir
- HTTP istekleri ve yanıtları kontrol edilir

## Notlar

- Test dosyaları `.spec.ts` uzantısı ile bitmelidir
- Her test dosyası bağımsız olarak çalışabilmelidir
- Test verilerini temizlemeyi unutmayın
