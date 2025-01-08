import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import repoRoute from "./repoRoute.js";
import issueRoute from "./issueRoute.js";
import commitRoute from "./commitRoute.js";

/*************************** API ROUTES ***************************/
const setupRoutes = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/repo", repoRoute);
  app.use("/api/v1/issue", issueRoute);
  app.use("/api/v1/commit", commitRoute);
};

export default setupRoutes;
