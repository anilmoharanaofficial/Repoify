import AWS from "aws-sdk";
import { config } from "dotenv";
config();

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const S3_BUCKET = "myownvcs";

export { s3, S3_BUCKET };
