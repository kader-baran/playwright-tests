import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        console.log("Pull request test"); // PR farkı için eklendi
    }

    async goto() {
        await this.page.goto('https://demoqa.com/');
    }

    async getTitle() {
        return await this.page.title();
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    async clickElementsCard() {
        await this.page.getByText('Elements').click();
    }

    async clickTextBoxCard() {
        await this.page.getByText('Text Box').click();
    }

    async isPageLoaded() {
        // Sayfanın yüklendiğini kontrol etmek için bir element bekleyelim
        await this.page.waitForSelector('body', { timeout: 10000 });
        return true;
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async fillFullName(name: string) {
        await this.page.getByPlaceholder('Full Name').fill(name);
    }


}

