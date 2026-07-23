import express from "express";
import { authorize, protect } from "../Middleware/authMiddleware.js";
import { createPrescription, viewPrescription } from "../controller/prescriptionController.js";

const router = express.Router();
router.post("/" , protect ,authorize(["doctor"]),createPrescription);
router.get("/:appointmentId" , protect , authorize(["doctor" , "patient"]) , viewPrescription);

export default router;