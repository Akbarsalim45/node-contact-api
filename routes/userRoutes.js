import express from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", verifyToken, currentUser);

export default router;
