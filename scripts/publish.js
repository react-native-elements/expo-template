const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..", "templates");

fs.readdirSync(root).forEach((template) => {
  const distTag = template.replace(/stable-?/, "");
  const tag = distTag ? `--tag ${distTag}` : "";
  console.log({ template, distTag });
  execSync(`cd templates/${template} && npm publish ${tag} --access=public `);
});
