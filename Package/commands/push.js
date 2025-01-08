import { isLoggedIn } from "../middleware/authMiddleware.js";
import { fsAsync, filePath } from "../utils/fileUtils.js";

/***************************  HANDLE PUSH REPO  ***************************/
const pushRepo = async () => {
  // Check User is Logged in or not
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    console.error(
      "Error: You must be logged in to push code. Please run 'repoify login' to log in."
    );

    return;
  }

  console.log("Commits pushed successfully...........");
};

export default pushRepo;
