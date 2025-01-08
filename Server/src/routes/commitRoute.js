import { Router } from "express";
import { pushCommits } from "../controllers/CommitController.js";

const commitRoute = Router();

commitRoute.post("/push", pushCommits);

export default commitRoute;
