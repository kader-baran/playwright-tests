import { Page, Locator, expect } from "@playwright/test";
import { Logger } from "../utils/Logger";
//Page	Her Playwright testinde kullanılan tarayıcı sekmesini temsil eder.
//Locator	Sayfadaki bir HTML elementini temsil eder.
//expect	Playwright’ın assertion (doğrulama) aracıdır.
//Logger	Kendi oluşturduğun (veya harici) bir log sistemidir. Konsola bilgi yazmak için kullanılır. Örn: Logger.info(...) gibi.

export class BasePage { //BasePage'i diğer tüm sayfa sınıfları (HomePage, FormPage, vs.) miras alacak.
  protected readonly page: Page; //protected: Alt sınıflar kullanabilir ama dışarıdan erişilemez,readonly: Sadece bir kere tanımlanır, sonra değiştirilemez,page: Playwright tarafından kontrol edilen sayfa nesnesi

  constructor(page: Page) {//BasePage sınıfı oluşturulurken page parametresi alır,Bu page nesnesi sınıf içinde kullanılmak üzere this.page olarak saklanır,Alt sınıflar da super(page) ile bunu miras alacak.
    this.page = page;
  }

  async waitForPageLoad() { //Sayfa yüklenmesini bekleme
    Logger.info("Wait for page load: domcontentloaded");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoPath(pathname: string) { // Belirli bir sayfaya gitme
    Logger.info(`Navigate to path: ${pathname}`);
    await this.page.goto(pathname);
  }

  async expectVisible(locator: Locator) { // Elementin görünür olduğundan emin olma
    Logger.info("Expect locator to be visible");
    await expect(locator).toBeVisible();
  }

  async click(locator: Locator) { // Bir elemente tıklama
    Logger.info("Click on locator");
    await this.expectVisible(locator);
    await locator.click();
  }

  async type(locator: Locator, value: string) { //Bir input alanına veri yazma
    Logger.info(`Type value into locator: ${value}`);
    await this.expectVisible(locator);
    await locator.fill(value);
  }
}
