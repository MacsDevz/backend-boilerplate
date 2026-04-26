import express from "express";

//middleware
import { isAuthenticated, isAllowed } from "../middlewares/authMiddleware.js";
//controller
import { register, login, logout } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", isAuthenticated, login);
router.post("/logout", logout);

router.post("/dashboard", isAllowed, (req, res) => {
  res.json({ message: "Welcome to Dashboard" });
});

export default router;
