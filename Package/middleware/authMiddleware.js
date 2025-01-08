import { fsAsync, filePath } from "../utils/fileUtils.js";

/***************************  ISLOGGEDIN  ***************************/
const COOKIE_PATH = filePath.resolve(process.cwd(), ".repoify_cookies.json");
const isLoggedIn = async () => {
  try {
    const cookies = await fsAsync.readFile(COOKIE_PATH, "utf-8");
    return cookies ? true : false;
  } catch (error) {
    return false;
  }
};

export { isLoggedIn };
