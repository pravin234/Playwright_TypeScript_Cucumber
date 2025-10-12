declare module "multiple-cucumber-html-reporter" {
  export function generate(options: any): void;
}

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BROWSER: "chrome" | "firefox" | "webkit";
      ENV: "staging" | "prod" | "test";
      BASEURL: string;
      HEAD: "true" | "false";
    }
  }
}
