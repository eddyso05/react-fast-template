const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

export function generateComponent(program) {
  console.log("Starting Generate Component: " + program.opts().component);
  const componentName = program.opts().component;

  const sourceDirectory = path.join(__dirname, "template", componentName); // Adjust the source path as needed
  const destinationDirectory = path.join(process.cwd(), componentName);

  if (!fs.existsSync(sourceDirectory)) {
    console.error(`Source directory '${sourceDirectory}' not found.`);
    return;
  }

  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory);
  }

  // Copy the entire folder's content recursively
  fse.copySync(sourceDirectory, destinationDirectory);

  console.log(
    `Generated component '${componentName}' in '${destinationDirectory}'`
  );
}
