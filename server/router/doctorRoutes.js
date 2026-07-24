import express from "express"
import { authorize, protect } from "../Middleware/authMiddleware.js";
import { getAllDoctors, getDoctorById, registerDoctor, searchDoctor , updateDoctorProfile , updateDoctorStatus } from "../controller/doctorController.js";

const router = express.Router();
router.post("/" , protect , authorize(["admin"]) , registerDoctor)
router.get("/", protect , authorize(["admin", "receptionist"]) , getAllDoctors)
router.get("/search" , protect , authorize(["admin", "receptionist"]) , searchDoctor)
router.get("/:id" , protect , authorize(["admin", "receptionist"]) , getDoctorById)
router.put("/:doctorId",protect,authorize(["admin"]),updateDoctorProfile);


router.patch("/:doctorId/status",protect,authorize(["admin"]),updateDoctorStatus);


export default router;