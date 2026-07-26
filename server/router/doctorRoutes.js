import express from "express";
import {
    getAllDoctors,
    getDoctorById,
    registerDoctor,
    searchDoctor,
    updateDoctorProfile,
    updateDoctorStatus,
} from "../controller/doctorController.js";

import { protect, authorize } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(["admin"]),
    registerDoctor
);

router.get(
    "/",
    protect,
    authorize(["admin", "receptionist"]),
    getAllDoctors
);

router.get(
    "/search",
    protect,
    authorize(["admin", "receptionist"]),
    searchDoctor
);

router.get(
    "/:doctorId",
    protect,
    authorize(["admin", "receptionist"]),
    getDoctorById
);

router.put(
    "/:doctorId",
    protect,
    authorize(["admin"]),
    updateDoctorProfile
);

router.patch(
    "/:doctorId/status",
    protect,
    authorize(["admin"]),
    updateDoctorStatus
);

export default router;