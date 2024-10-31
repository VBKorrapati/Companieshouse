import { expect, Page, Locator } from "@playwright/test";

export class CommonAsserts {
    async verifyLogin(page: Page, expectedURL: string): Promise<void> {
        await page.waitForLoadState("networkidle");
        const currentURL = page.url();
        expect(currentURL).toBe(expectedURL); 
    }

    async verifyPageTitle(pageTitleLocator: Locator): Promise<void> {
        await expect(pageTitleLocator).toBeVisible(); 
    }
}