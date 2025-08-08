# Playwright Test Projesi

Bu repo; Playwright ile yazılmış, frontend (UI) ve backend (API) testlerini barındıran örnek bir test otomasyon projesidir.

## Projenin Genel Amacı

- Frontend: POM (Page Object Model) ile sürdürülebilir ve okunabilir UI testleri
- Backend: API uçlarının fonksiyonel doğrulaması ve veri akışlarının kontrolü
- Kolay çalıştırılabilirlik: Hazır npm script’leri, renkli loglar ve konsol özeti

Detaylı kullanım ve mimari açıklamalar için alt klasörlerdeki dokümanlara bakın:

- Frontend: [frontend-tests/README.md](frontend-tests/README.md)
- Backend: [backend-tests/README.md](backend-tests/README.md)

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

Detaylı test yazım rehberleri için ilgili klasörlerin README dosyalarını inceleyin:

- Frontend: [frontend-tests/README.md](frontend-tests/README.md)
- Backend: [backend-tests/README.md](backend-tests/README.md)

## Notlar

- Test dosyaları `.spec.ts` uzantısı ile bitmelidir
- Her test dosyası bağımsız çalışmalıdır
- Detaylı konfigürasyon ve gelişmiş kullanım için alt klasör README’lerine bakın
