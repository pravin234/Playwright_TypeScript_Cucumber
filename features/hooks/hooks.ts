import {
  Before,
  After,
  ITestCaseHookParameter,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { Browser, Page, chromium } from "playwright";
import fs from "fs";
import path from "path";

setDefaultTimeout(30 * 1000);

declare module "@cucumber/cucumber" {
  interface World {
    browser?: Browser;
    page?: Page;
    username?: string;
  }
}

// Launch browser before each scenario
Before(async function (this: any) {
  const browser = await chromium.launch({
    headless: process.env.HEADLESS !== "false", // run headful if HEADLESS=false
  });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

// After each scenario: take screenshot and close browser
After(async function (this: any, testCase: ITestCaseHookParameter) {
  if (!this.page) return;

  // Create screenshots folder if it doesn't exist
  const screenshotsDir = path.resolve("./screenshots");
  if (!fs.existsSync(screenshotsDir))
    fs.mkdirSync(screenshotsDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const status = testCase.result?.status || "UNKNOWN";
  const scenarioName = testCase.pickle.name.replace(/ /g, "_");
  const screenshotFileName = `${timestamp}_${status}_${scenarioName}.png`;
  const screenshotPath = path.join(screenshotsDir, screenshotFileName);

  try {
    // Capture screenshot
    const screenshotBuffer = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    // Attach screenshot as base64 so it displays inline in Cucumber HTML report
    this.attach(screenshotBuffer.toString("base64"), "image/png");

    console.log(`Screenshot saved: ${screenshotPath}`);
  } catch (err) {
    console.error("Failed to take screenshot:", err);
  }

  // Close page and browser after screenshot
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();

  console.log(
    `Scenario "${testCase.pickle.name}" finished with status: ${status}`
  );
});
