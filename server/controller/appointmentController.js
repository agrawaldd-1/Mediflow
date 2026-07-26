import { Patient } from "../models/patients.js";
import { User } from "../models/user.js";
import { Doctor } from "../models/doctors.js";
import { Appointment } from "../models/appointments.js";
import mongoose from "mongoose";

export const bookAppointment = async (req, res) => {
    try {
        const {
            patientId,
            doctorId,
            appointmentDateTime,
            reasonForVisit,
        } = req.body;

        
        if (!patientId || !doctorId || !appointmentDateTime || !reasonForVisit) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        
        if (
            !mongoose.Types.ObjectId.isValid(patientId) ||
            !mongoose.Types.ObjectId.isValid(doctorId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Patient ID or Doctor ID.",
            });
        }

        const appointmentTime = new Date(appointmentDateTime);

 
        if (isNaN(appointmentTime.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment date.",
            });
        }

      
        if (appointmentTime <= new Date()) {
            return res.status(400).json({
                success: false,
                message: "Appointment cannot be booked for a past date and time.",
            });
        }

        const minutes = appointmentTime.getMinutes();

        if (![0, 30].includes(minutes)) {
            return res.status(400).json({
                success: false,
                message: "Appointments can only be booked at 00 or 30 minutes.",
            });
        }

        if (
            appointmentTime.getSeconds() !== 0 ||
            appointmentTime.getMilliseconds() !== 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment time.",
            });
        }

        const [patient, doctor] = await Promise.all([
            Patient.findById(patientId).populate("userId", "isActive"),
            Doctor.findById(doctorId).populate("userId", "isActive"),
        ]);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found.",
            });
        }

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found.",
            });
        }

        if (!patient.userId.isActive) {
            return res.status(403).json({
                success: false,
                message: "Patient account is inactive.",
            });
        }

        if (!doctor.userId.isActive) {
            return res.status(403).json({
                success: false,
                message: "Doctor account is inactive.",
            });
        }

        const appointmentHour = appointmentTime.getHours();

        if (
            appointmentHour < doctor.workingHours.start ||
            appointmentHour >= doctor.workingHours.end
        ) {
            return res.status(400).json({
                success: false,
                message: "Doctor is not available during the selected time.",
            });
        }

        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDateTime,
            status: "Booked",
        });

        if (existingAppointment) {
            return res.status(409).json({
                success: false,
                message: "Selected appointment slot is already booked.",
            });
        }

        const appointment = await Appointment.create({
            patientId,
            doctorId,
            appointmentDateTime,
            reasonForVisit: reasonForVisit.trim(),
        });

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully.",
            appointment,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Appointment ID.",
            });
        }

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found.",
            });
        }

        if (appointment.status === "Canceled") {
            return res.status(409).json({
                success: false,
                message: "Appointment is already canceled.",
            });
        }

        if (appointment.status === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Completed appointment cannot be canceled.",
            });
        }

        if (appointment.appointmentDateTime < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Past appointments cannot be canceled.",
            });
        }

        appointment.status = "Canceled";

        await appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment canceled successfully.",
            appointment,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const completeAppointment = async (req, res) => {
    try {
        const { id: appointmentId } = req.params;

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

        if (appointment.status === "Completed") {
            return res.status(409).json({
                success: false,
                message: "Appointment is already completed.",
            });
        }

        if (appointment.status === "Canceled") {
            return res.status(409).json({
                success: false,
                message: "Canceled appointments cannot be completed.",
            });
        }

        const currentTime = new Date();
        const appointmentTime = new Date(appointment.appointmentDateTime);

        if (appointmentTime > currentTime) {
            return res.status(400).json({
                success: false,
                message: "Future appointments cannot be completed.",
            });
        }

        appointment.status = "Completed";

        await appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment completed successfully.",
            appointment,
        });

    } catch (error) {
        console.error("Complete Appointment Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const getDoctorsAvailability = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { date } = req.query;

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID.",
            });
        }

        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Date query parameter is required.",
            });
        }

        const selectedDate = new Date(date);

        if (isNaN(selectedDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format.",
            });
        }

        const doctor = await Doctor.findById(doctorId)
            .populate("userId", "isActive");

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found.",
            });
        }

        if (!doctor.userId.isActive) {
            return res.status(403).json({
                success: false,
                message: "Doctor account is inactive.",
            });
        }

        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const bookedAppointments = await Appointment.find({
            doctorId,
            appointmentDateTime: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
            status: "Booked",
        }).select("appointmentDateTime");

        const bookedSlots = new Set();

        for (const appointment of bookedAppointments) {
            const appointmentTime = new Date(appointment.appointmentDateTime);

            const hour = String(appointmentTime.getHours()).padStart(2, "0");
            const minute = String(appointmentTime.getMinutes()).padStart(2, "0");

            bookedSlots.add(`${hour}:${minute}`);
        }

        const availableSlots = [];

        for (
            let hour = doctor.workingHours.start;
            hour < doctor.workingHours.end;
            hour++
        ) {
            for (const minute of [0, 30]) {
                const slot = `${String(hour).padStart(2, "0")}:${String(
                    minute
                ).padStart(2, "0")}`;

                if (!bookedSlots.has(slot)) {
                    availableSlots.push(slot);
                }
            }
        }

        return res.status(200).json({
            success: true,
            date,
            doctorId,
            availableSlots,
        });

    } catch (error) {
        console.error("Doctor Availability Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const getAllAppointments = async (req, res) => {
    try {
        const currentDateTime = new Date();

        const appointments = await Appointment.find({
            appointmentDateTime: { $gte: currentDateTime },
        })
            .sort({ appointmentDateTime: 1 })
            .populate({
                path: "patientId",
                populate: {
                    path: "userId",
                    select: "name",
                },
            })
            .populate({
                path: "doctorId",
                populate: {
                    path: "userId",
                    select: "name",
                },
            });

        if (appointments.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                appointments: [],
                message: "No upcoming appointments found.",
            });
        }

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });

    } catch (error) {
        console.error("Get All Appointments Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const getTodayAppointment = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({
            userId: req.user.id,
        });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found.",
            });
        }

        const today = new Date();

        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const appointments = await Appointment.find({
            doctorId: doctor._id,
            appointmentDateTime: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
            status: "Booked",
        })
            .sort({ appointmentDateTime: 1 })
            .populate({
                path: "patientId",
                populate: {
                    path: "userId",
                    select: "name",
                },
            });

        if (appointments.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                appointments: [],
                message: "No appointments scheduled for today.",
            });
        }

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });

    } catch (error) {
        console.error("Get Today's Appointments Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const getPatientDetails = async (req, res) => {
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
                message: "You are not authorized to access this patient's details.",
            });
        }

        await appointment.populate({
            path: "patientId",
            populate: {
                path: "userId",
                select: "name email phone",
            },
        });

        return res.status(200).json({
            success: true,
            patient: appointment.patientId,
            appointment: {
                appointmentDateTime: appointment.appointmentDateTime,
                reasonForVisit: appointment.reasonForVisit,
                status: appointment.status,
            },
        });

    } catch (error) {
        console.error("Get Patient Details Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const upcomingAppointments = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            userId: req.user.id,
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found.",
            });
        }

        const currentDateTime = new Date();

        const appointments = await Appointment.find({
            patientId: patient._id,
            status: "Booked",
            appointmentDateTime: {
                $gte: currentDateTime,
            },
        })
            .sort({ appointmentDateTime: 1 })
            .populate({
                path: "doctorId",
                populate: {
                    path: "userId",
                    select: "name",
                },
            });

        if (appointments.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                appointments: [],
                message: "No upcoming appointments found.",
            });
        }

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });

    } catch (error) {
        console.error("Upcoming Appointments Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

