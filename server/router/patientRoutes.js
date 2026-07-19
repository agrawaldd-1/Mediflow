import express from "express"
import { registerPatient } from "../controller/patientController.js";
import { protect , authorize } from "../Middleware/authMiddleware.js";
const patientRoutes = express.Router();

patientRoutes.post("/" , protect,authorize(["receptionist"]),registerPatient)


export default patientRoutes;