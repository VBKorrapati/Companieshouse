import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";
import { InventoryPage } from "../../pages/inventory-page";
import { CartPage } from "../../pages/cart-page";
import { BaseURL,VerifyLogin ,StandardUser } from "../constants";

import { CommonAsserts } from "../commonAsserts";

const commonAsserts = new CommonAsserts();

test("verify Items in the cart from inventory", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto(BaseURL);
  await loginPage.login(StandardUser.username, StandardUser.password);
  await commonAsserts.verifyLogin(page , VerifyLogin);

  await inventoryPage.addItemsToCart('Sauce Labs Backpack');
  await inventoryPage.addItemsToCart('Sauce Labs Bolt T-Shirt');
  await inventoryPage.addItemsToCart('Sauce Labs Fleece Jacket');
  const cartItemsCount = await inventoryPage.getCartItemsCount();
  expect(cartItemsCount).toBeGreaterThan(0);
  await inventoryPage.openShoppingCart()

  await commonAsserts.verifyPageTitle(cartPage.pageTitle);

  const itemsToVerify = [
    'Sauce Labs Backpack',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket'
  ];

  // verify items selected in inventory got added into the cart
  for (const item of itemsToVerify) {
    const isInCart = await cartPage.isItemInCart(item);
    expect(isInCart).toBe(true);
  }

  // remove an item from the cart
  await cartPage.clickRemoveButton('Sauce Labs Backpack');
  const isRemoved = await cartPage.isItemInCart('Sauce Labs Backpack');
  expect(isRemoved).toBe(false);

  // verify items in the cart
  const remainingItems = [
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket'
  ];
  for (const item of remainingItems) {
    const isInCart = await cartPage.isItemInCart(item);
    expect(isInCart).toBe(true); 
  }


});
