import { Doctor } from "../models/doctors.js";
import { Appointment } from "../models/appointments.js";
import { Prescription } from "../models/prescription.js";
import mongoose from "mongoose";
import { Patient } from "../models/patients.js";
export const createPrescription = async (req, res) => {
    try {
        const { appointmentId, diagnosis, medicines, instructions, followUpDate } = req.body;
        if (!appointmentId || !diagnosis) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID and diagnosis are required.",
            });
        }
        if (!Array.isArray(medicines) || medicines.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one medicine is required",
            });
        }
        const doctor = await Doctor.findOne({ userId: req.user.id });
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Appointment ID"
            });
        }
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        if (!appointment.doctorId.equals(doctor._id)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this patient's details.",
            });
        }
        if (appointment.status !== "Booked") {
            return res.status(400).json({
                success: false,
                message: "Prescription can only be created for booked appointments."
            });
        }
        const existingPrescription = await Prescription.findOne({ appointmentId });

        if (existingPrescription) {
            return res.status(409).json({
                success: false,
                message: "Prescription already exists for this appointment.",
            });
        }
        const prescription = await Prescription.create({
            appointmentId,
            doctorId: doctor._id,
            patientId: appointment.patientId,
            diagnosis,
            medicines,
            instructions,
            followUpDate,
        })
        appointment.status = "Completed";

        await appointment.save();
        return res.status(201).json({
            success: true,
            message: "Prescription created successfully.",
            prescription
        })

    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const viewPrescription = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Appointment ID"
            });
        }
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }
        if (req.user.role == "doctor") {
            const doctor = await Doctor.findOne({ userId: req.user.id });
            if (!doctor) {
                return res.status(404).json({
                    success: false,
                    message: "Doctor not found"
                })
            }
            if (!appointment.doctorId.equals(doctor._id)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to access this prescription.",
                });
            }
        }
        else if (req.user.role == "patient") {
            const patient = await Patient.findOne({ userId: req.user.id })
            if (!patient) {
                return res.status(404).json({
                    success: false,
                    message: "Patient not found"
                })
            }
            if (!appointment.patientId.equals(patient._id)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to access this patient's details.",
                });
            }
        }
        else {

            return res.status(403).json({
                success: false,
                message: "Access denied."
            });
        }


            const prescription = await Prescription.findOne({ appointmentId: appointment._id });
            if (!prescription) {
                return res.status(404).json({
                    success: false,
                    message: "Prescription not found"
                })
            }
            return res.status(200).json({
                success: true,
                prescription
            });
        }

    catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });

        }
    }