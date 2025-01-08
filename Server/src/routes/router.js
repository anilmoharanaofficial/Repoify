import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import repoRoute from "./repoRoute.js";
import issueRoute from "./issueRoute.js";

/*************************** API ROUTES ***************************/
const setupRoutes = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/repo", repoRoute);
  app.use("/api/v1/issue", issueRoute);
};

export default setupRoutes;
