#!/usr/bin/env node
import { ComponentCommand } from "./commands/index.js";
import { createRequire } from "module";

export default async function main(args) {
  const localRequire = createRequire(import.meta.url);
  const pkg = localRequire("../package.json");

  // init dotenv
  // dotEnvConfig({ path: path.resolve(process.cwd(), ".env.local") });

  // Initialize generate component command

  const program = ComponentCommand(args);

  program.version(pkg.version);
  program.parse(args);
}

main(process.argv);
