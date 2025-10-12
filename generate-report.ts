import { generate } from "multiple-cucumber-html-reporter";
import path from "path";

const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, "-");

generate({
  jsonDir: path.resolve("reports"),
  reportPath: path.resolve(`reports/html-report-${timestamp}`),
  displayDuration: true,
  reportName: `SauceDemo Test Report - ${now.toLocaleString()}`,
  pageTitle: "SauceDemo Automation Report",
  openReportInBrowser: true, // auto open after generation
  displayReportTime: true,
  metadata: {
    browser: { name: "Playwright", version: "1.56.0" },
    platform: { name: process.platform },
    user: process.env.USER || process.env.USERNAME || "LocalUser",
    date: now.toLocaleString(),
    environment: "STAGING",
  },
  customData: {
    title: "Test Execution Info",
    data: [
      { label: "Feature", value: "SauceDemo Login" },
      {
        label: "Executed By",
        value: process.env.USER || process.env.USERNAME || "LocalUser",
      },
      { label: "Date & Time", value: now.toLocaleString() },
    ],
  },
});
// This script generates an HTML report from Cucumber JSON reports
