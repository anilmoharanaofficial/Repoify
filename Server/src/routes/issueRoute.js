import { Router } from "express";
import {
  createIssue,
  deleteIssueById,
  getAllIssues,
  getIssueById,
  updateIssueById,
} from "../controllers/issueController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

/***************************  ISSUE ROUTES  ***************************/

router.post("/create", isLoggedIn, createIssue);
router.put("/update/:id", isLoggedIn, updateIssueById);
router.delete("/delete/:id", isLoggedIn, deleteIssueById);
router.get("/", isLoggedIn, getAllIssues);
router.get("/:id", isLoggedIn, getIssueById);

export default router;
