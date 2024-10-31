import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    private page: Page;
    private firstAddToCartButton: Locator; 
    private shoppingCartLink: Locator;
    private inventoryItems: Locator;
    private shoppingCartBadge: Locator;
    public pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstAddToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.pageTitle = page.getByText('Products');
  }
 
  async addItemsToCart(inventoryDetails: string) {
    await this.inventoryItems
        .filter({ hasText: inventoryDetails })
        .locator('button', { hasText: 'ADD TO CART' })
        .click();
}

async removeItemsToCart(inventoryDetails: string): Promise<void> {
    const removeButton = await this.inventoryItems
        .filter({ hasText: inventoryDetails })
        .locator('button', { hasText: 'REMOVE' });
    
    if (await removeButton.count() > 0) {
        await removeButton.click();
    } else {
        console.error(`Remove button not found for item: ${inventoryDetails}`);
    }
}

async getCartItemsCount(): Promise<number> { 
    const badgeText = await this.shoppingCartBadge.innerText(); 
    return parseInt(badgeText, 10);
}

  async openShoppingCart() {
    await this.shoppingCartLink.click(); 

  }

}
