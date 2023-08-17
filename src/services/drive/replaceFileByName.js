import fse from "fs-extra";
import path from "path";

export const replaceFileByName = async (
  fileName,
  sourcePath,
  destinationFolderId,
  drive
) => {
  try {
    const existingFile = await findFileByName(
      fileName,
      destinationFolderId,
      drive
    );

    if (existingFile) {
      // Upload the updated file contents
      const media = {
        mimeType: "application/octet-stream",
        body: fse.createReadStream(sourcePath),
      };

      const fileMetadata = {
        name: path.basename(sourcePath),
      };

      await drive.files.update({
        fileId: existingFile.id,
        requestBody: fileMetadata,
        media: media,
        fields: "id",
      });

      console.log(`File ${fileMetadata.name} replaced`);
      return true;
    } else {
      console.error(`File ${fileName} not found in the specified folder.`);
      return false;
    }
  } catch (err) {
    console.error("Error replacing file:", err);
    return false;
  }
};
// Function to find a file by name in a specific folder
const findFileByName = async (fileName, folderId, drive) => {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and name='${fileName}'`,
      fields: "files(id)",
    });

    if (response.data.files.length > 0) {
      return response.data.files[0]; // Return the first matching file
    } else {
      return null; // File not found
    }
  } catch (err) {
    console.error("Error searching for file:", err);
    return null;
  }
};
