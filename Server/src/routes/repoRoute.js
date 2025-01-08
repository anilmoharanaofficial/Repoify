import { Router } from "express";
import {
  createRepository,
  deleteRepositoryById,
  fetchRepositoriesForCurrentUser,
  fetchRepositoryById,
  fetchRepositoryByName,
  getAllRepositories,
  toggleVisibilityById,
  updateRepositoryById,
} from "../controllers/repoController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

/***************************  USER ROUTES  ***************************/
router.get("/", isLoggedIn, fetchRepositoriesForCurrentUser);
router.post("/create", isLoggedIn, createRepository);
router.patch("/set-visibility", toggleVisibilityById);
router.put("/update-repo/:id", updateRepositoryById);
router.delete("/delete-repo/:id", deleteRepositoryById);

router.get("/all", isLoggedIn, getAllRepositories);
router.get("/:repoID", isLoggedIn, fetchRepositoryById);
router.get("/:name", fetchRepositoryByName);

export default router;
