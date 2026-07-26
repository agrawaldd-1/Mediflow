import express from "express";

import {
    createPrescription,
    viewPrescription,
} from "../controller/prescriptionController.js";

import {
    authorize,
    protect,
} from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(["doctor"]),
    createPrescription
);

router.get(
    "/:appointmentId",
    protect,
    authorize(["doctor", "patient"]),
    viewPrescription
);

export default router;