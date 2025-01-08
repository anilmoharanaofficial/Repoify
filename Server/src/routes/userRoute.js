import { Router } from "express";
import {
  deleteAccount,
  getAllUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

/***************************  USER ROUTES  ***************************/
router.get("/profile", isLoggedIn, getUserProfile);
router.put("/update", isLoggedIn, updateUserProfile);
router.delete("/delete", isLoggedIn, deleteAccount);
router.get("/get-all-user", isLoggedIn, getAllUser);

export default router;
