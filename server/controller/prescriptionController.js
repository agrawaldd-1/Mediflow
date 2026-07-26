import { Doctor } from "../models/doctors.js";
import { Appointment } from "../models/appointments.js";
import { Prescription } from "../models/prescription.js";
import mongoose from "mongoose";
import { Patient } from "../models/patients.js";


export const createPrescription = async (req, res) => {
    try {
        const {
            appointmentId,
            diagnosis,
            medicines,
            instructions,
            followUpDate,
        } = req.body;

        if (!appointmentId || !diagnosis) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID and diagnosis are required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment ID.",
            });
        }

        const normalizedDiagnosis = diagnosis.trim();

        if (!normalizedDiagnosis) {
            return res.status(400).json({
                success: false,
                message: "Diagnosis cannot be empty.",
            });
        }

        if (!Array.isArray(medicines) || medicines.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one medicine is required.",
            });
        }

        const doctor = await Doctor.findOne({
            userId: req.user.id,
        });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found.",
            });
        }

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found.",
            });
        }

        if (!appointment.doctorId.equals(doctor._id)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to create a prescription for this appointment.",
            });
        }

        if (appointment.status !== "Booked") {
            return res.status(409).json({
                success: false,
                message: "Prescription can only be created for booked appointments.",
            });
        }

        const existingPrescription = await Prescription.findOne({
            appointmentId,
        });

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
            diagnosis: normalizedDiagnosis,
            medicines,
            instructions,
            followUpDate,
        });

        appointment.status = "Completed";

        await appointment.save();

        return res.status(201).json({
            success: true,
            message: "Prescription created successfully.",
            prescription,
        });

    } catch (error) {
        console.error("Create Prescription Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const viewPrescription = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment ID.",
            });
        }

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found.",
            });
        }

        if (req.user.role === "doctor") {
            const doctor = await Doctor.findOne({
                userId: req.user.id,
            });

            if (!doctor) {
                return res.status(404).json({
                    success: false,
                    message: "Doctor not found.",
                });
            }

            if (!appointment.doctorId.equals(doctor._id)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to access this prescription.",
                });
            }

        } else if (req.user.role === "patient") {

            const patient = await Patient.findOne({
                userId: req.user.id,
            });

            if (!patient) {
                return res.status(404).json({
                    success: false,
                    message: "Patient not found.",
                });
            }

            if (!appointment.patientId.equals(patient._id)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to access this prescription.",
                });
            }

        } else {

            return res.status(403).json({
                success: false,
                message: "Access denied.",
            });

        }

        const prescription = await Prescription.findOne({
            appointmentId,
        })
            .populate({
                path: "doctorId",
                populate: {
                    path: "userId",
                    select: "name email",
                },
                select: "specialization",
            })
            .populate({
                path: "patientId",
                populate: {
                    path: "userId",
                    select: "name email",
                },
                select: "bloodGroup",
            });

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found.",
            });
        }

        return res.status(200).json({
            success: true,
            prescription,
        });

    } catch (error) {
        console.error("View Prescription Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};