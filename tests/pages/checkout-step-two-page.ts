import { Page, Locator } from "@playwright/test";
import { PostCode } from "../testscenarios/constants";
import { faker } from '@faker-js/faker';


export class CheckOutStepTwoPage {
  private page: Page;
  private finishButton: Locator;
  public pageTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByRole('link', { name: 'FINISH' });
    this.pageTitle = page.getByText('Checkout: Overview');
  }

  async clickFinish() {
    await this.finishButton.click();
  }

 
}
