import express from "express"
import { registerPatient , getAllPatients, searchPatient, getPatientById, medicalHistory, getPatientProfile } from "../controller/patientController.js";
import { protect , authorize } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post("/" , protect,authorize(["receptionist"]),registerPatient)
router.get("/", protect , authorize(["receptionist"]) ,getAllPatients) 
router.get("/search" , protect, authorize(["receptionist"]) , searchPatient)
router.get("/:id",protect, authorize(["receptionist"]) , getPatientById)
router.get("/medicalHistory" , protect , authorize(["patient"]) , medicalHistory)
router.get("/profile" , protect , authorize(["patient"]) , getPatientProfile)



export default router;