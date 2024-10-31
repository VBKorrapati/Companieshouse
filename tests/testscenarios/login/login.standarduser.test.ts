import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";
import { CommonAsserts } from "../commonAsserts";
import { BaseURL,VerifyLogin ,StandardUser } from "../constants";

test("Verify successful login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const commonAsserts = new CommonAsserts();
  await loginPage.goto(BaseURL);
  await loginPage.login(StandardUser.username, StandardUser.password);
  await commonAsserts.verifyLogin(page, VerifyLogin); 
});

test("Verify successful login with problem credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const commonAsserts = new CommonAsserts();
  await loginPage.goto(BaseURL);
  await loginPage.login(StandardUser.username, StandardUser.password);
  await commonAsserts.verifyLogin(page, VerifyLogin); 
});
