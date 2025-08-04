import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormsPage extends BasePage {
  // Locators
  private practiceFormCard: Locator;

  // Practice Form locators
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private userEmailInput: Locator;
  private maleGenderLabel: Locator;
  private femaleGenderLabel: Locator;
  private otherGenderLabel: Locator;
  private userNumberInput: Locator;
  private subjectsInput: Locator;
  private subjectsOption: Locator;
  private readingHobbyLabel: Locator;
  private sportsHobbyLabel: Locator;
  private musicHobbyLabel: Locator;
  private currentAddressInput: Locator;
  private stateDropdown: Locator;
  private stateOption: Locator;
  private cityDropdown: Locator;
  private cityOption: Locator;
  private submitButton: Locator;
  private modalContent: Locator;

  constructor(page: Page) {
    super(page);
    
    // Main cards
    this.practiceFormCard = this.page.locator('.element-list').locator('li').filter({ hasText: 'Practice Form' });

    // Practice Form locators
    this.firstNameInput = this.page.locator('#firstName');
    this.lastNameInput = this.page.locator('#lastName');
    this.userEmailInput = this.page.locator('#userEmail');
    this.maleGenderLabel = this.page.locator('label[for="gender-radio-1"]');
    this.femaleGenderLabel = this.page.locator('label[for="gender-radio-2"]');
    this.otherGenderLabel = this.page.locator('label[for="gender-radio-3"]');
    this.userNumberInput = this.page.locator('#userNumber');
    this.subjectsInput = this.page.locator('#subjectsInput');
    this.subjectsOption = this.page.locator('#react-select-2-option-0');
    this.readingHobbyLabel = this.page.locator('label[for="hobbies-checkbox-2"]');
    this.sportsHobbyLabel = this.page.locator('label[for="hobbies-checkbox-1"]');
    this.musicHobbyLabel = this.page.locator('label[for="hobbies-checkbox-3"]');
    this.currentAddressInput = this.page.locator('#currentAddress');
    this.stateDropdown = this.page.locator('#state');
    this.stateOption = this.page.locator('#react-select-3-option-0');
    this.cityDropdown = this.page.locator('#city');
    this.cityOption = this.page.locator('#react-select-4-option-0');
    this.submitButton = this.page.locator('#submit');
    this.modalContent = this.page.locator('.modal-content');
  }

  // Navigation methods
  async navigateToForms() {
    await this.navigateTo('https://demoqa.com/forms');
  }

  // Card click methods
  async clickPracticeFormCard() {
    await this.clickElement(this.practiceFormCard);
  }

  // Practice Form methods
  async fillBasicInfo(firstName: string, lastName: string, email: string) {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.userEmailInput, email);
  }

  async selectGender(gender: 'male' | 'female' | 'other') {
    switch (gender) {
      case 'male':
        await this.clickElement(this.maleGenderLabel);
        break;
      case 'female':
        await this.clickElement(this.femaleGenderLabel);
        break;
      case 'other':
        await this.clickElement(this.otherGenderLabel);
        break;
    }
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.fillInput(this.userNumberInput, phoneNumber);
  }

  async selectSubject(subject: string) {
    await this.fillInput(this.subjectsInput, subject);
    await this.clickElement(this.subjectsOption);
  }

  async selectHobby(hobby: 'reading' | 'sports' | 'music') {
    switch (hobby) {
      case 'reading':
        await this.clickElement(this.readingHobbyLabel);
        break;
      case 'sports':
        await this.clickElement(this.sportsHobbyLabel);
        break;
      case 'music':
        await this.clickElement(this.musicHobbyLabel);
        break;
    }
  }

  async fillCurrentAddress(address: string) {
    await this.fillInput(this.currentAddressInput, address);
  }

  async selectState() {
    await this.removeAds(); // Reklamları kaldır
    await this.clickElement(this.stateDropdown);
    await this.clickElement(this.stateOption);
  }

  async selectCity() {
    await this.removeAds(); // Reklamları kaldır
    await this.clickElement(this.cityDropdown);
    await this.clickElement(this.cityOption);
  }

  async submitPracticeForm() {
    await this.clickElement(this.submitButton);
  }

  async expectModalContentVisible() {
    await this.expectElementVisible(this.modalContent);
  }

  // Complete form fill method
  async fillCompletePracticeForm(formData: {
    firstName: string;
    lastName: string;
    email: string;
    gender: 'male' | 'female' | 'other';
    phoneNumber: string;
    subject: string;
    hobby: 'reading' | 'sports' | 'music';
    address: string;
  }) {
    await this.fillBasicInfo(formData.firstName, formData.lastName, formData.email);
    await this.selectGender(formData.gender);
    await this.fillPhoneNumber(formData.phoneNumber);
    await this.selectSubject(formData.subject);
    await this.selectHobby(formData.hobby);
    await this.fillCurrentAddress(formData.address);
    await this.selectState();
    await this.selectCity();
  }
} 