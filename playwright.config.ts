import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  reporter: [["html", { outputFolder: "playwright-report", open: "always" }]],
  use: {
    headless: false, // 👈 Run in GUI (headful) mode
    screenshot: "on", // capture both pass and fail
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
});
