import express from "express";
import authRoutes from "./router/authRoutes.js"
import authPatients from "./router/patientRoutes.js";
import authDoctors from "./router/doctorRoutes.js"
import authAppointments from "./router/appointmentRoutes.js"
import authPrescription from "./router/prescriptionRoutes.js"
import cors from "cors";
const app = express();



app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients" , authPatients);
app.use("/api/doctors",authDoctors);
app.use("/api/appointments",authAppointments)
app.use("/api/prescription",authPrescription)
app.get("/", (req, res) => {
    res.send("Server Running...")
})

app.get("/api/health", (req, res) => {
    res.json({
        "success": true,
        "message": "MediFlow Backend is Running"
    })
})

export default app;