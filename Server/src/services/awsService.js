import { s3, S3_BUCKET } from "../config/aws.js";

const uploadCommitFiles = async (fileContent, fileName, commitDir) => {
  const params = {
    Bucket: S3_BUCKET,
    key: `commits/${commitDir}/${fileName}`,
    Body: fileContent,
  };

  try {
    await s3.upload(params).promise();
    console.log(`Uploaded ${fileName} to S3`);
  } catch (error) {
    throw new Error(`Failed to upload ${fileName} to S3: ${error.message}`);
  }
};

export default uploadCommitFiles;
