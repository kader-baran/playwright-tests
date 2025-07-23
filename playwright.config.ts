import { defineConfig } from 'playwright/test';

export default defineConfig({
  // Birden fazla klasörü tarayacak şekilde wildcard kullanıyoruz
  testDir: './', // kök klasörden başlat
  testMatch: ['**/*.spec.ts'], // tüm alt klasörlerdeki .spec.ts dosyalarını bul
  use: {
    headless: false,
  },
});
