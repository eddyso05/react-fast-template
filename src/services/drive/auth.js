// Load service account credentials
import wawaConfig from "../../json/wawa.json" assert { type: "json" };
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
import { google } from "googleapis";

// Authorize the service account
export const authorizeServiceAccount = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: wawaConfig,
    scopes: SCOPES,
  });
  return auth.getClient();
};
