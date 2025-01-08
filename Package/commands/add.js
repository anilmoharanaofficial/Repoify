import { filePath, fsAsync } from "../utils/fileUtils.js";

const addRepo = async (file) => {
  const repoPath = filePath.resolve(process.cwd(), ".repoify");
  const stagingPath = filePath.join(repoPath, "staging");

  try {
    // Check if the .repoify directory exists
    const repoExists = await fsAsync.stat(repoPath).catch(() => false);
    if (!repoExists) {
      console.error(
        "Repository not initialized. Please run 'repoify init' first."
      );
      return;
    }

    // Ensure the file to be added exists
    const fileExists = await fsAsync.stat(file).catch(() => false);
    if (!fileExists) {
      console.error(`File not found: ${file}`);
      return;
    }

    // Create the staging area if it doesn't exist
    await fsAsync.mkdir(stagingPath, { recursive: true });

    // Copy the file to the staging area
    const fileName = filePath.basename(file);
    const destinationPath = filePath.join(stagingPath, fileName);

    const alreadyStaged = await fsAsync
      .stat(destinationPath)
      .catch(() => false);
    if (alreadyStaged) {
      console.log(`File ${fileName} is already in the staging area.`);
      return;
    }

    await fsAsync.copyFile(file, destinationPath);
    console.log(`File ${fileName} added to the staging area.`);
  } catch (error) {
    console.error("Error adding file:", error.message);
  }
};

export default addRepo;
