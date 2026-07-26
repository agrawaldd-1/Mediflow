import express from "express";
import { protect, authorize } from "../Middleware/authMiddleware.js";
import { getAdminDashboard } from "../controller/adminController.js";

const router = express.Router();

router.get(
    "/dashboard",
    protect,
    authorize(["admin"]),
    getAdminDashboard
);

export default router;