import express from "express";
import authController from "../auth/authController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/profile", auth, authController.getProfile);

export default router;
