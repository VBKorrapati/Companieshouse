import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";
import { InventoryPage } from "../../pages/inventory-page";
import { BaseURL,VerifyLogin ,StandardUser } from "../constants";

async function verifyLogin(page) {
  await expect(page).toHaveURL(VerifyLogin);
}


test("remove item that has been added into the cart from inventory", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto(BaseURL);
  await loginPage.login(StandardUser.username, StandardUser.password);
  await verifyLogin(page);

  await inventoryPage.addItemsToCart('Sauce Labs Backpack');
  await inventoryPage.addItemsToCart('Sauce Labs Bolt T-Shirt');
  await inventoryPage.addItemsToCart('Sauce Labs Fleece Jacket');
  const cartItemsCount = await inventoryPage.getCartItemsCount();
  expect(cartItemsCount).toBeGreaterThan(0);

  // remove item that is added 
  await inventoryPage.removeItemsToCart('Sauce Labs Backpack');
  const cartItemsCountAferRemove = await inventoryPage.getCartItemsCount();
  expect(cartItemsCountAferRemove).toBeLessThan(cartItemsCount);
});
