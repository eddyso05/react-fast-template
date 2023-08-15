#!/usr/bin/env node
import { getCurrentModuleDirectory } from "../utils/getCurrentDirectory.js";
import { uploadFolder } from "../services/drive.js";
import path from "path";
import fs from "fs";

// find the current path -> bin of the project that user want to save the template
export const addComponent = () => {
  const sourceDirectory = path.join(getCurrentModuleDirectory(path), "bin");

  if (!fs.existsSync(sourceDirectory)) {
    console.error(`Source directory '${sourceDirectory}' not found.`);
    return;
  }

  // add the folder into cloud open source storage
  uploadFolder(sourceDirectory);
};
