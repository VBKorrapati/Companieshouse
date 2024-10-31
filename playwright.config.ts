import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests", 
  forbidOnly: !!process.env.CI, 
  retries: process.env.CI ? 2 : 0, 
  workers: process.env.CI ? 1 : undefined, 
  reporter: [["html"]], 
  timeout: 30000, 

  use: {
    trace: "on-first-retry", 
    headless: true, 
    screenshot: "on", 
  },

  projects: [
    {
      name: "Chromium", 
      use: { ...devices["Desktop Chrome"] }, 
    },
    {
      name: "Firefox", 
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "WebKit", 
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
