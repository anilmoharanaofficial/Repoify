import { filePath, fsAsync } from "../utils/fileUtils.js";
import { v4 as uuidv4 } from "uuid";

const commitRepo = async (message) => {
  const repoPath = filePath.resolve(process.cwd(), ".VCSBIN");
  const stagedPath = filePath.join(repoPath, "staging");
  const commitPath = filePath.join(repoPath, "commits");

  try {
    const commitId = uuidv4();
    const commitDir = filePath.join(commitPath, commitId);
    await fsAsync.mkdir(commitDir, { recursive: true });

    const files = await fsAsync.readdir(stagedPath);

    for (const file of files) {
      await fsAsync.copyFile(
        filePath.join(stagedPath, file),
        filePath.join(commitDir, file)
      );
    }

    await fsAsync.writeFile(
      filePath.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() })
    );

    console.log(`Commit ${commitId} created with message: ${message}`);
  } catch (error) {
    console.error("Error committing files: ", error);
  }
};

export default commitRepo;
