import { filePath, fsAsync } from "../utils/fileUtils.js";

const initRepo = async () => {
  const repoPath = filePath.resolve(process.cwd(), ".VCSBIN");
  const commitsPath = filePath.join(repoPath, "commits");

  try {
    await fsAsync.mkdir(repoPath, { recursive: true });
    await fsAsync.mkdir(commitsPath, { recursive: true });
    await fsAsync.writeFile(
      filePath.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET })
    );
    console.log("Repository initialised!");
  } catch (error) {
    console.error("Error initialising repository", error);
  }
};

export default initRepo;
