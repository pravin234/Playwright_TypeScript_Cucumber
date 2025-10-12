import fs from "fs-extra";

(async () => {
  await fs.emptyDir("./reports");
  await fs.emptyDir("./screenshots");
  console.log("Reports and screenshots cleaned!");
})();

export {};
