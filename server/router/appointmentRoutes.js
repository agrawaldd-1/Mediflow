import express from "express"
import { authorize , protect } from "../Middleware/authMiddleware.js"
import { bookAppointment , cancelAppointment, completeAppointment, getAllAppointments, getDoctorsAvailability, getPatientDetails, getTodayAppointment} from "../controller/appointmentController.js"
 

const router = express.Router();
router.post("/" ,protect , authorize(["receptionist"]) , bookAppointment )
router.patch("/:id/cancel" , protect , authorize(["receptionist"]) , cancelAppointment)
router.patch("/:id/complete" , protect , authorize(["doctor"]) , completeAppointment)
router.get("/doctor/:doctorId/availability" , protect , authorize(["receptionist"]) , getDoctorsAvailability)
router.get("/" , protect , authorize(["doctor" , "receptionist"]) ,getAllAppointments)
router.get("/doctor/today" , protect , authorize(["doctor"]), getTodayAppointment)
router.get("/:appointmentId/patient" , protect , authorize(["doctor" , "receptionist"]),getPatientDetails);
export default router;
