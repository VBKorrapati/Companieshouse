import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";
import { InventoryPage } from "../../pages/inventory-page";
import { CartPage } from "../../pages/cart-page";
import { CheckOutStepOnePage } from "../../pages/checkout-step-one-page";
import { CheckOutStepTwoPage } from "../../pages/checkout-step-two-page";
import { CheckOutCompletePage } from "../../pages/checkout-complete-page";
import { CommonAsserts } from "../commonAsserts";
import { BaseURL,VerifyLogin ,StandardUser } from "../constants";

const commonAsserts = new CommonAsserts();

test("verify Items in the cart from inventory", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkOutStepOnePage = new CheckOutStepOnePage(page);
  const checkOutStepTwoPage = new CheckOutStepTwoPage(page);
  const checkOutCompletePage = new CheckOutCompletePage(page);
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

  // click on continue button
  await cartPage.clickCheckoutButton();
  await commonAsserts.verifyPageTitle(checkOutStepOnePage.pageTitle);

  // enter checkout details
  await checkOutStepOnePage.fillCheckoutInformation()
  await checkOutStepOnePage.clickContinue();

  await commonAsserts.verifyPageTitle(checkOutStepTwoPage.pageTitle);

  //enter checkout step two
  await checkOutStepTwoPage.clickFinish();

  //verify checkout complete page
  await commonAsserts.verifyPageTitle(checkOutCompletePage.pageTitle);

});
