import { google } from "googleapis";
import fse from "fs-extra";
import path from "path";
import { createTimestampFile } from "./createTimestamp.js";
import { authorizeServiceAccount } from "./auth.js";
import { uploadFile } from "./uploadFile.js";

const uploadedDirectories = [];
let funcName = "";

// Upload a file or folder to Google Drive
const copyAndUploadToDrive = async (
  auth,
  sourcePath,
  destinationFolderId,
  firstLoop
) => {
  const drive = google.drive({ version: "v3", auth });

  const fileStats = fse.statSync(sourcePath);

  if (fileStats.isDirectory()) {
    // Upload the directory only once
    if (uploadedDirectories.includes(sourcePath)) {
      return;
    }
    uploadedDirectories.push(sourcePath);

    const directoryName = firstLoop ? funcName : path.basename(sourcePath);
    const directoryMetadata = {
      name: directoryName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [destinationFolderId],
    };

    let directoryId;
    try {
      const res = await drive.files.create({
        requestBody: directoryMetadata,
        fields: "id",
      });
      directoryId = res.data.id;
      console.log(
        `Directory ${directoryName} uploaded to Google Drive with ID: ${directoryId}`
      );
    } catch (err) {
      console.error("Error uploading directory:", err);
      return;
    }

    const files = fse.readdirSync(sourcePath);
    for (const file of files) {
      const filePath = path.join(sourcePath, file);
      await copyAndUploadToDrive(auth, filePath, directoryId, false);
    }
  } else {
    await uploadFile(sourcePath, destinationFolderId, drive);
  }
  const timestampFolderId = "1f-3ya2BGwauamXYodj6QqGevxrG1gmfN";
  await createTimestampFile(timestampFolderId, drive);
};

// Main function
export const uploadFolder = async (sourceFilePath, Name) => {
  const auth = await authorizeServiceAccount();
  const parentFolderId = "13yJyCE-ThE7WueXbj24GnC4drSJauxXG"; // Use this if you want to upload to a specific folder
  funcName = Name;
  await copyAndUploadToDrive(auth, sourceFilePath, parentFolderId, true);
};
