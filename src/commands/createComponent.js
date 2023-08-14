import fs from "fs";
import path from "path";
import fse from "fs-extra";

const getCurrentModuleDirectory = () => {
  const __filename = new URL(import.meta.url).pathname;
  return path.dirname(__filename);
};

export function generateComponent(program) {
  console.log("Starting Generate Component: " + program.opts().component);
  const componentName = program.opts().component;

  const sourceDirectory = path.join(
    getCurrentModuleDirectory(),
    "components",
    componentName
  ); // Adjust the source path as needed
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
