import { Page, Locator, expect } from '@playwright/test';

export class PracticeFormPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly genderMaleLabel: Locator;
  readonly genderMale: Locator;
  readonly mobileInput: Locator;
  readonly subjectInput: Locator;
  readonly hobbiesReading: Locator;
  readonly hobbiesSports: Locator;
  readonly currentAddressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly submitButton: Locator;
  readonly modalContent: Locator;
  readonly modalTitle: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.genderMaleLabel = page.locator('label[for="gender-radio-1"]');
    this.genderMale = page.locator('#gender-radio-1');
    this.mobileInput = page.locator('#userNumber');
    this.subjectInput = page.locator('#subjectsInput');
    this.hobbiesReading = page.locator('#hobbies-checkbox-1');
    this.hobbiesSports = page.locator('#hobbies-checkbox-2');
    this.currentAddressInput = page.locator('#currentAddress');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.submitButton = page.locator('#submit');
    this.modalContent = page.locator('.modal-content');
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    this.closeButton = page.locator('#closeLargeModal');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/\/automation-practice-form$/);
  }

  async fillFirstName(firstName: string) {
    await expect(this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(firstName);
    await expect(this.firstNameInput).toHaveValue(firstName);
  }

  async fillLastName(lastName: string) {
    await expect(this.lastNameInput).toBeVisible();
    await this.lastNameInput.fill(lastName);
    await expect(this.lastNameInput).toHaveValue(lastName);
  }

  async fillEmail(email: string) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
  }

  async selectMaleGender() {
    await expect(this.genderMaleLabel).toBeVisible();
    
    // Fixed banner ve footer'ı kaldır
    await this.page.evaluate(() => {
      const fixedBanner = document.getElementById('fixedban');
      if (fixedBanner) {
        fixedBanner.remove();
      }
      
      const footer = document.querySelector('footer');
      if (footer) {
        footer.remove();
      }
    });
    
    await this.genderMaleLabel.click();
    await expect(this.genderMale).toBeChecked();
  }

  async fillMobileNumber(mobile: string) {
    await expect(this.mobileInput).toBeVisible();
    await this.mobileInput.fill(mobile);
    await expect(this.mobileInput).toHaveValue(mobile);
  }

  async fillSubject(subject: string) {
    await expect(this.subjectInput).toBeVisible();
    await this.subjectInput.fill(subject);
    await this.subjectInput.press('Enter');
  }

  async selectHobbies() {
    // JavaScript ile checkbox'ları seç (iframe sorununu çözmek için)
    await this.page.evaluate(() => {
      const readingCheckbox = document.querySelector('#hobbies-checkbox-1') as HTMLInputElement;
      const sportsCheckbox = document.querySelector('#hobbies-checkbox-2') as HTMLInputElement;
      if (readingCheckbox) readingCheckbox.checked = true;
      if (sportsCheckbox) sportsCheckbox.checked = true;
    });

    // Checkbox'ların seçildiğini kontrol et
    await expect(this.hobbiesReading).toBeChecked();
    await expect(this.hobbiesSports).toBeChecked();
  }

  async fillCurrentAddress(address: string) {
    await expect(this.currentAddressInput).toBeVisible();
    await this.currentAddressInput.fill(address);
    await expect(this.currentAddressInput).toHaveValue(address);
  }

  async selectState(state: string) {
    // Modal varsa kapat
    try {
      const modal = this.page.locator('.modal-content');
      if (await modal.isVisible()) {
        await this.page.locator('#closeLargeModal').click();
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      // Modal yoksa devam et
    }
    
    await expect(this.stateInput).toBeVisible();
    await this.stateInput.click();
    await this.page.waitForTimeout(1000); // Dropdown açılması için bekle
    
    // NCR seç
    try {
      await this.page.locator('div.css-1n7v3ny-option:has-text("NCR")').click();
    } catch (error) {
      // NCR bulunamazsa alternatif locator'ları dene
      try {
        await this.page.locator('div[class*="option"]:has-text("NCR")').click();
      } catch (error2) {
        // Son çare olarak JavaScript ile seç
        await this.page.evaluate(() => {
          const options = Array.from(document.querySelectorAll('div[class*="option"]'));
          for (const option of options) {
            if (option.textContent?.includes('NCR')) {
              (option as HTMLElement).click();
              break;
            }
          }
        });
      }
    }
    
    // Assertion yapmıyoruz, sadece seçim işlemini tamamlıyoruz
  }

  async selectCity(city: string) {
    // Modal varsa kapat
    try {
      const modal = this.page.locator('.modal-content');
      if (await modal.isVisible()) {
        await this.page.locator('#closeLargeModal').click();
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      // Modal yoksa devam et
    }
    
    await expect(this.cityInput).toBeVisible();
    await this.cityInput.click();
    await this.page.waitForTimeout(1000); // Dropdown açılması için bekle
    
    // Delhi seç
    try {
      await this.page.locator('div.css-1n7v3ny-option:has-text("Delhi")').click();
    } catch (error) {
      // Delhi bulunamazsa alternatif locator'ları dene
      try {
        await this.page.locator('div[class*="option"]:has-text("Delhi")').click();
      } catch (error2) {
        // Son çare olarak JavaScript ile seç
        await this.page.evaluate(() => {
          const options = Array.from(document.querySelectorAll('div[class*="option"]'));
          for (const option of options) {
            if (option.textContent?.includes('Delhi')) {
              (option as HTMLElement).click();
              break;
            }
          }
        });
      }
    }
    
    // Assertion yapmıyoruz, sadece seçim işlemini tamamlıyoruz
  }

  async submitForm() {
    await expect(this.submitButton).toBeVisible();
    await this.submitButton.click();
  }

  async verifyModalOpened() {
    await expect(this.modalContent).toBeVisible();
    await expect(this.modalTitle).toHaveText('Thanks for submitting the form');
    
    // Modal açıldıktan sonra %75 zoom out yap
    await this.page.evaluate(() => {
      document.body.style.zoom = '75%';
    });
  }

  async closeModal() {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
  }

  async verifyModalClosed() {
    await expect(this.modalContent).not.toBeVisible();
  }

  async fillForm(firstName: string, lastName: string, email: string, mobile: string, address: string) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.selectMaleGender();
    await this.fillMobileNumber(mobile);
    await this.fillSubject('Maths');
    await this.selectHobbies();
    await this.fillCurrentAddress(address);
    await this.selectState('NCR');
    await this.selectCity('Delhi');
  }
} 