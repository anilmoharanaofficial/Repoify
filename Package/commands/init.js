import path from "path";
import fs from "fs/promises";
import { exec } from "child_process";

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

    // Hidden .repoify folder on Windows
    if (process.platform === "win32") {
      exec(`attrib +h "${repoPath}"`, (error) => {
        if (error) {
          console.error("Failed to hide the folder on Windows:", error.message);
        }
      });
    }
  } catch (error) {
    console.error("Error initializing repository:", error.message);
  }
};

export default initRepo;
