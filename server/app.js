import express from "express";
import authRoutes from "./router/authRoutes.js"
import authPatients from "./router/patientRoutes.js";
import cors from "cors";
const app = express();



app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients" , authPatients);
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