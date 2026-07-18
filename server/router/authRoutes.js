import express from "express";
import { loginUser , getProfile } from "../controller/authControl.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();
router.post("/login",loginUser);
router.get("/profile",protect,getProfile);

export default router;