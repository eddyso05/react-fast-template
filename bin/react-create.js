#!/usr/bin/env node
import main from "../src/index.js";

const isNotValidNodeVersion = () => {
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split(".");
  const major = semver[0];

  if (major < 16) {
    console.error(
      "You are running Node " +
        currentNodeVersion +
        "React Fast Template requires Node 16 or higher. Please update Node Version."
    );

    return true;
  }

  return false;
};

// --- Check if user is running Node 16 or higher.
if (isNotValidNodeVersion()) {
  process.exit(1);
}

main(process.argv);
