import { Page, Locator } from "@playwright/test";

export class CartPage {
  private page: Page;
  private removeButton: Locator;
  private continueShoppingButton: Locator;
  private checkoutButton: Locator;
  private itemsInCart: Locator;
  public pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeButton = page.locator(".btn_secondary.cart_button");
    this.continueShoppingButton = page.locator("a.btn_secondary");
    this.checkoutButton = page.locator("a.btn_action.checkout_button");
    this.itemsInCart = page.locator('.cart_item');
    this.pageTitle = page.getByText('Your Cart');
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }
  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async isItemInCart(itemName: string): Promise<boolean> {
   
    const itemCount = await this.itemsInCart
      .locator('.inventory_item_name') 
      .filter({ hasText: itemName }) 
      .count(); 
    return itemCount > 0; 
  }

  async clickRemoveButton(itemName: string) {
    await this.itemsInCart
      .filter({ hasText: itemName }) 
      .locator('button.btn_secondary') 
      .click(); 
  }
}
