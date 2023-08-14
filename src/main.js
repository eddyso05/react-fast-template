#!/usr/bin/env node
import { ComponentCommand } from "./commander";

export default async function main(args) {
  const pkg = localRequire("../package.json");

  // init dotenv
  // dotEnvConfig({ path: path.resolve(process.cwd(), ".env.local") });

  // Initialize generate component command

  const program = ComponentCommand(args, cliConfigFile, program);

  program.version(pkg.version);
  program.parse(args);
}
