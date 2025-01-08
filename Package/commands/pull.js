import { filePath, fsAsync } from "../utils/fileUtils.js";
import { s3, S3_BUCKET } from "../config/aws.js";

const pullRepo = async () => {
  const repoPath = filePath.resolve(process.cwd(), ".VCSBIN");
  const commitsPath = filePath.join(repoPath, "commits");

  try {
    const data = await s3
      .listObjectsV2({
        Bucket: S3_BUCKET,
        Prefix: "commits/",
      })
      .promise();

    const objects = data.Contents;

    for (const object of objects) {
      const key = object.Key;
      const commitDir = filePath.join(
        commitsPath,
        filePath.dirname(key).split("/").pop()
      );

      await fsAsync.mkdir(commitDir, { recursive: true });

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
      };

      const fileContent = await s3.getObject(params).promise();
      await fsAsync.writeFile(filePath.join(repoPath, key), fileContent.Body);

      console.log("All commits pulled successfully");
    }
  } catch (error) {
    console.log("Unable to pull : ", error);
  }
};

export default pullRepo;
