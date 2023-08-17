import path from "path";
import fse from "fs-extra";

export const uploadFile = async (sourcePath, destinationFolderId, drive) => {
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
};
