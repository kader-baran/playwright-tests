# Frontend UI Tests (POM)

Page Object Model (POM) ile yazılmış UI testleri. Typed fixtures ile Page Object’ler testlere otomatik enjekte edilir. Özel reporter ve renkli adım logları içerir.

## Klasör Yapısı

```
frontend-tests/
├── pages/       # Page Object'ler (BasePage + sayfa sınıfları)
├── tests/       # Spec dosyaları (TC_XX_*.spec.ts)
├── data/        # Test verileri
├── config/      # Playwright config
├── fixtures/    # Typed fixtures (POM enjeksiyonu)
├── utils/       # Logger
└── reporters/   # Özel konsol özeti
```

## POM Bileşenleri

- BasePage: `goto`, `waitForPageLoad`, `expectVisible`, `click`, `type`
- Sayfalar: `HomePage`, `CheckboxPage`, `RadioButtonPage`, ... BasePage’den extend
- Fixtures: `fixtures/test.ts` testlere `homePage`, `checkboxPage` vb. sağlar

## Çalıştırma

```bash
# Tüm frontend testleri
npm run test:frontend

# Headed
npm run test:frontend -- --headed

# UI Mode
npx playwright test --ui --config=frontend-tests/config/playwright.config.ts

# Belirli dosya
npx playwright test frontend-tests/tests/TC_01_checkbox.spec.ts --config=frontend-tests/config/playwright.config.ts

# Grep
npx playwright test --config=frontend-tests/config/playwright.config.ts --grep "Dropdown"

# Rapor
npx playwright show-report
```

## Logger & Reporter

- `utils/Logger.ts`: `Logger.info/warn/error` ile adım adım renkli loglar
- `reporters/summary-reporter.js`: toplam/passed/failed/skipped, oranlar ve toplam süre özeti

## İpuçları

- `HomePage.goto()` baseURL’e göre çalışır; config’te `baseURL` tanımlıdır
- Locator tercihleri: `getByRole`, `data-testid`, ardından CSS/XPath
