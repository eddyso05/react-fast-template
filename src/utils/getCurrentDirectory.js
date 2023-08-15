export const getCurrentModuleDirectory = () => {
  const __filename = new URL(import.meta.url).pathname;
  const directoryPath = path.dirname(__filename);
  const parentDirectoryPath = path.dirname(directoryPath);
  return parentDirectoryPath;
};
