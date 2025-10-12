import {
  setWorldConstructor,
  World as CucumberWorld,
} from "@cucumber/cucumber";
import { Browser, Page } from "playwright";

class CustomWorld extends CucumberWorld {
  browser?: Browser;
  page?: Page;

  constructor(options: any) {
    super(options);
    this.browser = undefined;
    this.page = undefined;
  }
}

setWorldConstructor(CustomWorld);
