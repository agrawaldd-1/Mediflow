import express from "express"
import { authorize, protect } from "../Middleware/authMiddleware.js";
import { getAllDoctors, getDoctorById, registerDoctor, searchDoctor } from "../controller/doctorController.js";

const doctorRouter = express.Router();
doctorRouter.post("/" , protect , authorize(["admin"]) , registerDoctor)
doctorRouter.get("/", protect , authorize(["admin", "receptionist"]) , getAllDoctors)
doctorRouter.get("/search" , protect , authorize(["admin", "receptionist"]) , searchDoctor)
doctorRouter.get("/:id" , protect , authorize(["admin", "receptionist"]) , getDoctorById)

export default doctorRouter;