import express from "express";

import {
    getAllPatients,
    getPatientById,
    getPatientProfile,
    medicalHistory,
    registerPatient,
    searchPatient,
    updatePatientProfile,
    updatePatientStatus,
} from "../controller/patientController.js";

import {
    authorize,
    protect,
} from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(["receptionist"]),
    registerPatient
);

router.get(
    "/",
    protect,
    authorize(["receptionist"]),
    getAllPatients
);

router.get(
    "/search",
    protect,
    authorize(["receptionist"]),
    searchPatient
);

router.get(
    "/medicalHistory",
    protect,
    authorize(["patient"]),
    medicalHistory
);

router.get(
    "/profile",
    protect,
    authorize(["patient"]),
    getPatientProfile
);

router.get(
    "/:patientId",
    protect,
    authorize(["receptionist"]),
    getPatientById
);

router.put(
    "/:patientId",
    protect,
    authorize(["admin", "receptionist"]),
    updatePatientProfile
);

router.patch(
    "/:patientId/status",
    protect,
    authorize(["admin"]),
    updatePatientStatus
);

export default router;