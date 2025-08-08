import { defineConfig, devices } from "@playwright/test";
import path from "path";

export default defineConfig({ //defineConfig: Kod tamamlama ve tür güvenliği sağlar.
  testDir: path.resolve(__dirname, "../tests"),
  testMatch: "**/*.spec.ts",
  fullyParallel: true, //Tüm testler paralel (aynı anda) çalıştırılır. Hız kazandırır
  forbidOnly: !!process.env.CI, //CI ortamında çalışıyorsak true, değilsek false.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [ //Test sonucu HTML olarak raporlanır. Rapor dosyası: playwright-report/index.html
    ["list"],
    ["html"],
    [path.resolve(__dirname, "../reporters/summary-reporter.js")],
  ],
  use: {
    baseURL: "https://testing.qaautomationlabs.com",  //	Her testte kullanılacak temel URL.
    trace: "on-first-retry", //Test ilk kez başarısız olursa "trace" (aşama kaydı) alınır. HTML olarak incelenebilir.
    screenshot: "only-on-failure", //	Yalnızca başarısız testlerde ekran görüntüsü alınır.
    video: "retain-on-failure", //	Yalnızca başarısız testlerde video kaydı alınır.
  },
  projects: [
    {
      name: "chromium", //	Test için kullanılacak tarayıcı.
      use: { ...devices["Desktop Chrome"] }, // Masaüstü Chrome profiline ait tüm ayarlar kullanılır (örnek: ekran boyutu, kullanıcı ajanı, vs).


    },
  ],
});
