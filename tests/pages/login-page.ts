import { Page , Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;
  public pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
  }

  async goto(url: string) {
    if (!url) {
      throw new Error("URL is undefined. Please provide a valid URL.");
    }
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
