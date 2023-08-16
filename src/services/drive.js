import { google } from "googleapis";
import fse from "fs-extra";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
var funcName = "";
// Load service account credentials
import wawaConfig from "../json/wawa.json" assert { type: "json" };

// Authorize the service account
const authorizeServiceAccount = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: wawaConfig,
    scopes: SCOPES,
  });
  return auth.getClient();
};
const uploadedDirectories = [];
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
    // Upload the file
    const media = {
      mimeType: "application/octet-stream",
      body: fse.createReadStream(sourcePath),
    };

    const fileMetadata = {
      name: path.basename(sourcePath),
      parents: [destinationFolderId],
    };

    try {
      const res = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id",
      });
      console.log(
        `File ${fileMetadata.name} uploaded to Google Drive with ID: ${res.data.id}`
      );
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  }
};

// Main function
export const uploadFolder = async (sourceFilePath, Name) => {
  const auth = await authorizeServiceAccount();
  const parentFolderId = "13yJyCE-ThE7WueXbj24GnC4drSJauxXG"; // Use this if you want to upload to a specific folder
  funcName = Name;
  copyAndUploadToDrive(auth, sourceFilePath, parentFolderId, true);
};
