import express from "express"
import { registerPatient , getAllPatients, searchPatient, getPatientById } from "../controller/patientController.js";
import { protect , authorize } from "../Middleware/authMiddleware.js";
const patientRoutes = express.Router();

patientRoutes.post("/" , protect,authorize(["receptionist"]),registerPatient)
patientRoutes.get("/", protect , authorize(["receptionist"]) ,getAllPatients) 
patientRoutes.get("/search" , protect, authorize(["receptionist"]) , searchPatient)
patientRoutes.get("/:id",protect, authorize(["receptionist"]) , getPatientById)

export default patientRoutes;