import path from "path";
import fs from "fs/promises";

const initRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".repoify");
  const commitsPath = path.join(repoPath, "commits");

  try {
    await fs.mkdir(repoPath, { recursive: true });

    await fs.mkdir(commitsPath, { recursive: true });

    const config = { initializedAt: new Date().toISOString() };
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify(config, null, 2)
    );

    console.log(`Repository initialized successfully`);
  } catch (error) {
    console.error("Error initializing repository:", error.message);
  }
};

export default initRepo;
