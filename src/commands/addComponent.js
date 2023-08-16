#!/usr/bin/env node
import { uploadFolder } from "../services/drive.js";
import path from "path";
import fs from "fs";

// find the current path -> bin of the project that user want to save the template
export const addComponent = (program) => {
  const sourceDirectory = path.join(process.cwd(), "bin");

  if (!fs.existsSync(sourceDirectory)) {
    console.error(`Source directory '${sourceDirectory}' not found.`);
    return;
  }

  // add the folder into cloud open source storage
  uploadFolder(sourceDirectory, program.opts().add);
};
