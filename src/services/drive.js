import { google } from "googleapis";
import fs from "fs";
import readline from "readline";
import { OAuth2Client } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = "token.json"; // Change this to your desired token file path

// Load client secrets from the downloaded JSON file
import credentials from "../json/wawa.json";

// Authorize the client
const authorize = async () => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new OAuth2Client({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uris[0],
  });

  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    return getAccessToken(oAuth2Client);
  }
};

// Get and store new token
const getAccessToken = async (oAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this URL:", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the code from that page here: ", async (code) => {
    rl.close();
    const token = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(token.tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token.tokens));
  });
};

// Upload a file or folder to Google Drive
const copyAndUploadToDrive = async (auth, sourcePath, destinationFolderId) => {
  const drive = google.drive({ version: "v3", auth });

  const fileStats = fse.statSync(sourcePath);
  const media = {
    mimeType: "application/octet-stream",
    body: fse.createReadStream(sourcePath),
  };

  const fileMetadata = {
    name: sourcePath.split("/").pop(),
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
};
// Main function
export const uploadFolder = async (sourceFilePath) => {
  const auth = await authorize();
  const parentFolderId = "13yJyCE-ThE7WueXbj24GnC4drSJauxXG"; // Use this if you want to upload to a specific folder

  copyAndUploadToDrive(auth, sourceFilePath, parentFolderId);
};
