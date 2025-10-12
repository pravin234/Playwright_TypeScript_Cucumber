import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I navigate to {string}", async function (url: string) {
  if (!this.page) throw new Error("Page not initialized");
  await this.page.goto(url, { waitUntil: "networkidle" });
});

When("I enter the username as {string}", async function (username: string) {
  if (!this.page) throw new Error("Page not initialized");
  await this.page.fill("#user-name", username);
  this.username = username;
});

When("I enter the password as {string}", async function (password: string) {
  if (!this.page) throw new Error("Page not initialized");
  await this.page.fill("#password", password);
});

Then("I click the login button", async function () {
  if (!this.page) throw new Error("Page not initialized");
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: "networkidle" }),
    this.page.click("#login-button"),
  ]);
});

Then("I should be logged in successfully", async function () {
  if (!this.page) throw new Error("Page not initialized");

  // Wait for URL to match inventory page
  await this.page.waitForURL("https://www.saucedemo.com/inventory.html", {
    timeout: 10000,
  });

  // Assert
  const currentURL = this.page.url();
  console.log(`Current URL after login: ${currentURL}`);
  expect(currentURL).toContain("https://www.saucedemo.com/inventory.html");
});

export {};
