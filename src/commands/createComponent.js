import fs from "fs";
import path from "path";
import fse from "fs-extra";
import { getCurrentModuleDirectory } from "../utils/getCurrentDirectory.js";

export function generateComponent(program) {
  console.log("Starting Generate Component: " + program.opts().component);
  const componentName = program.opts().component;

  const sourceDirectory = path.join(
    getCurrentModuleDirectory(path),
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
