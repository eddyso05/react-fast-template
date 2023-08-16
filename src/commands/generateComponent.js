import fs from "fs";
import path from "path";
import { exec } from "child_process";

async function downloadAndExtractFolder(componentName) {
  const GITHUB_REPO_URL =
    "https://github.com/eddyso05/react-fast-template-storage";
  const GITHUB_FOLDER_PATH = `src/components/${componentName}`;
  const GITHUB_ARCHIVE_URL = `${GITHUB_REPO_URL}/archive/refs/heads/main.zip`;
  const destinationDirectory = path.join(
    process.cwd(),
    "template",
    componentName
  );

  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
  }

  const archiveFilePath = path.join(destinationDirectory, "master.zip");

  const wgetCommand = `wget -O ${archiveFilePath} ${GITHUB_ARCHIVE_URL} && cd template && unzip ${archiveFilePath} "react-fast-template-storage-main/${GITHUB_FOLDER_PATH}/*" -d ${componentName} && mv ${componentName}/react-fast-template-storage-main/${GITHUB_FOLDER_PATH}/* ${componentName}/ && rm -r ${componentName}/react-fast-template-storage-main && rm ${archiveFilePath}`;

  exec(wgetCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("Error running wget command:", error);
      return;
    }
    console.log("wget command executed successfully:", stdout);
  });
}

export async function generateComponent(program) {
  console.log("Starting Generate Component: " + program.opts().component);
  await downloadAndExtractFolder(program.opts().component);

  console.log(
    `Downloaded and extracted component '${
      program.opts().component
    }' folder from GitHub repository in '${program.opts().component}'`
  );
}
