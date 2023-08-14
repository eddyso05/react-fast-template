import { program } from "commander";
import { generateComponent } from "./createComponent.js";

export function ComponentCommand(args) {
  program
    .option("-c, --component <name>", "Generate a component")
    // .option("-a, --add <name>", "Add a component")
    .parse(process.argv);

  if (program.opts().component) {
    generateComponent(program);
  }

  return program;
}
