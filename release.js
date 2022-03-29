const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const version = process.argv[2];
const root = path.resolve(__dirname, "templates");

fs.readdirSync(root).forEach((template) => {
  const stable = template.includes("stable");
  const manifestPath = path.resolve(root, template, "package.json");
  const manifest = fs.readFileSync(manifestPath, "utf8");
  const manifestJson = JSON.parse(manifest);
  manifestJson.version = version + "." + template;
  if (stable) {
    manifestJson.dependencies["@rneui/base"] = version;
    manifestJson.dependencies["@rneui/themed"] = version;
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2));

  const distTag = template.replace(/stable-?/, "");
  const tag = distTag ? `--tag ${distTag}` : "";
  console.log({ template, distTag });
  execSync(`cd templates/${template} && npm publish ${tag} --access=public `);
});
