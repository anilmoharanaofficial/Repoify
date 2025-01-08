import { filePath, fsAsync } from "../utils/fileUtils.js";

const addRepo = async (file) => {
  const repoPath = filePath.resolve(process.cwd(), ".VCSBIN");
  const stagingPath = filePath.join(repoPath, "staging");

  try {
    await fsAsync.mkdir(stagingPath, { recursive: true });
    const fileName = filePath.basename(file);
    await fsAsync.copyFile(file, filePath.join(stagingPath, fileName));
    console.log(`File ${fileName} added to the staging area`);
  } catch (error) {
    console.error("Error adding file : ", error);
  }
};

export default addRepo;
