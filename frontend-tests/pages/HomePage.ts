export class HomePage {
    readonly page: Page;
    readonly elementsCard: Locator;
    readonly fullNameInput: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.elementsCard = page.locator('h5:has-text("Elements")');
      this.fullNameInput = page.locator('input[id="userName"]');
    }
  
    async goto() {
      await this.page.goto('/');
    }
  
    async getTitle() {
      return await this.page.title();
    }
  
    async checkTitle(expectedTitle: string) {
      await this.page.waitForLoadState();
      const actualTitle = await this.page.title();
      return actualTitle === expectedTitle;
    }
  
    async clickOnElementsCard() {
      await this.elementsCard.click();
    }
  
    async fillFullName(name: string) {
      await this.fullNameInput.fill(name);
    }
  }
  