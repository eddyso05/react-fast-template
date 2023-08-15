import { google } from "googleapis";
import fse from "fs-extra";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

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

// Upload a file or folder to Google Drive
const copyAndUploadToDrive = async (auth, sourcePath, destinationFolderId) => {
  const drive = google.drive({ version: "v3", auth });

  const fileStats = fse.statSync(sourcePath);

  if (fileStats.isDirectory()) {
    const files = fse.readdirSync(sourcePath);
    for (const file of files) {
      const filePath = path.join(sourcePath, file);
      await copyAndUploadToDrive(auth, filePath, destinationFolderId);
    }
  } else {
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
        `File ${res.data.name} uploaded to Google Drive with ID: ${res.data.id}`
      );
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  }
};

// Main function
export const uploadFolder = async (sourceFilePath) => {
  const auth = await authorizeServiceAccount();
  const parentFolderId = "13yJyCE-ThE7WueXbj24GnC4drSJauxXG"; // Use this if you want to upload to a specific folder

  copyAndUploadToDrive(auth, sourceFilePath, parentFolderId);
};
