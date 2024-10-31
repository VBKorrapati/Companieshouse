import { Page, Locator } from "@playwright/test";
import { PostCode } from "../testscenarios/constants";
import { faker } from '@faker-js/faker';


export class CheckOutStepOnePage {
  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postCodeInput: Locator;
  private continueButton: Locator;
  public pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.getByRole('button', { name: 'CONTINUE' });
    this.pageTitle = page.getByText('Checkout: Your Information');
  }


  private generateRandomName(): string {
    return faker.person.fullName(); 
  }

  async fillCheckoutInformation() {
    await this.firstNameInput.fill(this.generateRandomName());
    await this.lastNameInput.fill(this.generateRandomName());
    await this.postCodeInput.fill(PostCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

 
}
