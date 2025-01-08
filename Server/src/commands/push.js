import { filePath, fsAsync } from "../utils/fileUtils.js";
import { s3, S3_BUCKET } from "../config/aws.js";

const pushRepo = async () => {
  const repoPath = filePath.resolve(process.cwd(), ".VCSBIN");
  const commitsPath = filePath.join(repoPath, "commits");

  try {
    const commitDirs = await fsAsync.readdir(commitsPath);

    for (const commitDir of commitDirs) {
      const commitPath = filePath.join(commitsPath, commitDir);
      const files = await fsAsync.readdir(commitPath);

      for (const file of files) {
        const path = filePath.join(commitPath, file);
        const fileContent = await fsAsync.readFile(path);
        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        };

        await s3.upload(params).promise();
      }
    }

    console.log("Commits pushed successfully");
  } catch (error) {
    console.error("Pushing failed: ", error);
  }
};

export default pushRepo;
