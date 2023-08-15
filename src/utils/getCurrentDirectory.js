export const getCurrentModuleDirectory = (path) => {
  const __filename = new URL(import.meta.url).pathname;
  const directoryPath = path.dirname(__filename);
  const parentDirectoryPath = path.dirname(directoryPath);
  return parentDirectoryPath;
};

export const getUserModuleDirectory = (path) => {
  // Get the directory path of the current executing script
  const stack = new Error().stack;
  const callerFilePath = stack.split("\n")[2].match(/\((.*):\d+:\d+\)$/)[1];

  const directoryPath = path.dirname(callerFilePath);
  return directoryPath;
};
