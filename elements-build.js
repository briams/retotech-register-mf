const fs = require("fs-extra");
const concat = require("concat");

(async function build() {
  const files = [
    "./devops/dist/runtime.js",
    "./devops/dist/polyfills.js",
    // "./devops/dist/scripts.js",
    "./devops/dist/main.js",
  ];

  await fs.ensureDir("dist/rtech-register");
  await concat(files, "dist/rtech-register/rtech-register.js");

  await fs.copyFile(
    "./devops/dist/styles.css",
    "dist/rtech-register/styles.css"
  );

  await fs.rm("./devops", { recursive: true });
})();
