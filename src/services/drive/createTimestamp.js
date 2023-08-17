import path from "path";
import { replaceFileByName } from "./replaceFileByName.js";
import fse from "fs-extra";
import { uploadFile } from "./uploadFile.js";

// Function to create a timestamp file with the current timestamp and upload to Google Drive
export const createTimestampFile = async (timestampFolderId, drive) => {
  const unixTimestamp = Date.now();
  const timestampFileName = "timestamp.txt";
  const timestampFilePath = path.join(process.cwd(), timestampFileName);

  // Write the timestamp content to the local file
  fse.writeFileSync(timestampFilePath, unixTimestamp.toString(), "utf-8");

  // Upload the timestamp file to Google Drive
  const doneReplace = await replaceFileByName(
    timestampFileName,
    timestampFilePath,
    timestampFolderId,
    drive
  );

  if (!doneReplace) {
    await uploadFile(timestampFilePath, timestampFolderId, drive);
  }

  // Delete the local timestamp file
  fse.unlinkSync(timestampFilePath);
};
