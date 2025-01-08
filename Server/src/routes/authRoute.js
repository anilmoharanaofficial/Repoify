import { Router } from "express";
import {
  changePassword,
  login,
  logout,
  signup,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/change-password", changePassword);

export default router;
