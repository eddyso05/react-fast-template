import { program } from "commander";
import { generateComponent } from "./generateComponent.js";
import { addComponent } from "./addComponent.js";

export function ComponentCommand(args) {
  program
    .option("-c, --component <name>", "Generate a component")
    .option("-a, --add <name>", "Add a component")
    .parse(process.argv);

  if (program.opts().component) {
    generateComponent(program);
  }

  if (program.opts().component && program.opts().add) {
    console.error(
      "Generate and Add component options cannot use at the same time"
    );
    return null;
  }

  if (!program.opts().component && program.opts().add) {
    addComponent(program);
  }

  return program;
}
