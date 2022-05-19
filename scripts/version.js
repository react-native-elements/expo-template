const fs = require("fs");
const path = require("path");

const version = process.argv[2];
const root = path.resolve(__dirname, "..", "templates");

(function () {
  if (!version) return console.log("Version is required");

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
  });
})();
