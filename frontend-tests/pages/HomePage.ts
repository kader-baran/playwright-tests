import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        console.log("Pull request test"); // PR farkı için eklendi
    }

    async clickElementsCard() {
        await this.page.getByText('Elements').click();
    }

    async fillFullName(name: string) {
        await this.page.getByPlaceholder('Full Name').fill(name);
    }
}
