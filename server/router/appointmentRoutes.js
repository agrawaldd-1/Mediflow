import express from "express";
import {
    getDoctorsAvailability,
    getAllAppointments,
    getTodayAppointment,
    getPatientDetails,
    upcomingAppointments,
} from "../controller/appointmentController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/doctor/:doctorId/availability",
    protect,
    authorize(["receptionist"]),
    getDoctorsAvailability
);

router.get(
    "/",
    protect,
    authorize(["receptionist"]),
    getAllAppointments
);

router.get(
    "/today",
    protect,
    authorize(["doctor"]),
    getTodayAppointment
);

router.get(
    "/:appointmentId/patient",
    protect,
    authorize(["doctor"]),
    getPatientDetails
);

router.get(
    "/upcoming",
    protect,
    authorize(["patient"]),
    upcomingAppointments
);

export default router;