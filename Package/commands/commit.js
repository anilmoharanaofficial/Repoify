import { filePath, fsAsync } from "../utils/fileUtils.js";
import { v4 as uuidv4 } from "uuid";

const commitRepo = async (message) => {
  const repoPath = filePath.resolve(process.cwd(), ".repoify");
  const stagedPath = filePath.join(repoPath, "staging");
  const commitPath = filePath.join(repoPath, "commits");

  try {
    // If the staging area not exists
    const stagingExists = await fsAsync
      .access(stagedPath)
      .then(() => true)
      .catch(() => false);
    if (!stagingExists) {
      console.error(
        "Error: Staging area does not exist. Add files before committing."
      );
      return;
    }

    // Fetch files from staging area
    const files = await fsAsync.readdir(stagedPath);
    if (files.length === 0) {
      console.error("Error: No files in the staging area to commit.");
      return;
    }

    // Generate commit ID
    const commitId = uuidv4();
    const commitDir = filePath.join(commitPath, commitId);
    await fsAsync.mkdir(commitDir, { recursive: true });

    // Copy all files from staging to commit directory
    await Promise.all(
      files.map((file) =>
        fsAsync.copyFile(
          filePath.join(stagedPath, file),
          filePath.join(commitDir, file)
        )
      )
    );

    // Clean the staging area
    await Promise.all(
      files.map((file) => fsAsync.unlink(filePath.join(stagedPath, file)))
    );

    // Commit metadata
    const commitMetadata = {
      id: commitId,
      message,
      date: new Date().toISOString(),
      files,
    };
    await fsAsync.writeFile(
      filePath.join(commitDir, "commit.json"),
      JSON.stringify(commitMetadata, null, 2)
    );

    console.log(`Commit ${commitId} created successfully!"`);
  } catch (error) {
    console.error("Error committing files:", error.message);
  }
};

export default commitRepo;
