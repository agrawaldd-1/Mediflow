import express from "express";
import {
    getDoctorsAvailability,
    getAllAppointments,
    getTodayAppointment,
    getPatientDetails,
    upcomingAppointments,
    bookAppointment,
    cancelAppointment
} from "../controller/appointmentController.js";


import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
    "/",
    protect,
    authorize(["receptionist"]),
    bookAppointment
);

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
router.patch(
    "/:appointmentId/cancel",
    protect,
    authorize(["receptionist"]),
    cancelAppointment
);

export default router;