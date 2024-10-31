import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";
import { CommonAsserts } from "../commonAsserts";
import { BaseURL,VerifyLogin ,ProblemUser } from "../constants";

test("Verify successful login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const commonAsserts = new CommonAsserts();
  await loginPage.goto(BaseURL);
  await loginPage.login(ProblemUser.username, ProblemUser.password);
  await commonAsserts.verifyLogin(page, VerifyLogin); 
});

test("Verify successful login with problem credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const commonAsserts = new CommonAsserts();
  await loginPage.goto(BaseURL);
  await loginPage.login(ProblemUser.username, ProblemUser.password);
  await commonAsserts.verifyLogin(page, VerifyLogin); 
});
