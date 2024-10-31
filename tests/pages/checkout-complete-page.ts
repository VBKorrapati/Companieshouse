import { Page, Locator } from "@playwright/test";
import { PostCode } from "../testscenarios/constants";
import { faker } from '@faker-js/faker';


export class CheckOutCompletePage {
  private page: Page;
  public pageTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' });
  }
 
}
