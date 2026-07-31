import bcrypt from "bcrypt"
import { Patient } from "../models/patients.js";
import { User } from "../models/user.js";
import { Doctor } from "../models/doctors.js";
import { Appointment } from "../models/appointments.js";
import { Prescription } from "../models/prescription.js";
import mongoose from "mongoose";

export const registerPatient = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            gender,
            dateOfBirth,
            bloodGroup,
            phone,
            address,
            emergencyContactName,
            emergencyContactPhone,
            medicalHistory,
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !gender ||
            !dateOfBirth ||
            !bloodGroup ||
            !phone ||
            !address ||
            !emergencyContactName ||
            !emergencyContactPhone
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedAddress = address.trim();
        const normalizedEmergencyContactName =
            emergencyContactName.trim();

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must contain exactly 10 digits.",
            });
        }

        if (!/^\d{10}$/.test(emergencyContactPhone)) {
            return res.status(400).json({
                success: false,
                message: "Emergency contact phone must contain exactly 10 digits.",
            });
        }

        const validGenders = ["Male", "Female", "Other"];

        if (!validGenders.includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender.",
            });
        }

        const dob = new Date(dateOfBirth);

        if (isNaN(dob.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date of birth.",
            });
        }

        if (dob > new Date()) {
            return res.status(400).json({
                success: false,
                message: "Date of birth cannot be in the future.",
            });
        }

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
            role: "patient",
        });

        const patient = await Patient.create({
            userId: user._id,
            gender,
            dateOfBirth: dob,
            bloodGroup,
            phone,
            address: normalizedAddress,
            emergencyContactName: normalizedEmergencyContactName,
            emergencyContactPhone,
            medicalHistory,
        });

        return res.status(201).json({
            success: true,
            message: "Patient registered successfully.",
            data: {
                patientId: patient._id,
                userId: user._id,
                name: user.name,
                email: user.email,
                gender: patient.gender,
                bloodGroup: patient.bloodGroup,
                phone: patient.phone,
            },
        });

    } catch (error) {
        console.error("Register Patient Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find()
            .populate("userId", "name email isActive")
            .sort({ createdAt: -1 });

        if (patients.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                message: "No patients found.",
                patients: [],
            });
        }

        return res.status(200).json({
            success: true,
            count: patients.length,
            patients,
        });

    } catch (error) {
        console.error("Get All Patients Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const getPatientById = async (req, res) => {
    try {
        const { patientId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid patient ID.",
            });
        }

        const patient = await Patient.findById(patientId).populate(
            "userId",
            "name email isActive"
        );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found.",
            });
        }

        return res.status(200).json({
            success: true,
            patient,
        });

    } catch (error) {
        console.error("Get Patient By ID Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};
export const searchPatient = async (req, res) => {
    try {
        const searchQuery = req.query.query?.trim();

        if (!searchQuery) {
            return res.status(400).json({
                success: false,
                message: "Search query is required.",
            });
        }

        const patients = await Patient.find({
            $or: [
                { phone: { $regex: searchQuery, $options: "i" } },
                { bloodGroup: { $regex: searchQuery, $options: "i" } },
            ],
        })
            .populate({
                path: "userId",
                match: {
                    name: { $regex: searchQuery, $options: "i" },
                },
                select: "name email isActive",
            });

        const filteredPatients = patients.filter(
            (patient) =>
                patient.userId ||
                patient.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return res.status(200).json({
            success: true,
            count: filteredPatients.length,
            data: filteredPatients,
        });

    } catch (error) {
        console.error("Search Patient Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const medicalHistory = async (req, res) => {
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

        const medicalHistory = await Appointment.find({
            patientId: patient._id,
            status: "Completed",
        })
            .populate({
                path: "doctorId",
                select: "specialization",
                populate: {
                    path: "userId",
                    select: "name email",
                },
            })
            .sort({
                appointmentDateTime: -1,
            });

        if (medicalHistory.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                message: "No medical history found.",
                medicalHistory: [],
            });
        }

        return res.status(200).json({
            success: true,
            count: medicalHistory.length,
            medicalHistory,
        });

    } catch (error) {
        console.error("Medical History Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const getPatientProfile = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            userId: req.user.id,
        }).populate("userId", "name email");

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found.",
            });
        }

        return res.status(200).json({
            success: true,
            patient: {
                patientId: patient._id,
                userId: patient.userId._id,
                name: patient.userId.name,
                email: patient.userId.email,
                gender: patient.gender,
                dateOfBirth: patient.dateOfBirth,
                bloodGroup: patient.bloodGroup,
                phone: patient.phone,
                address: patient.address,
                emergencyContactName: patient.emergencyContactName,
                emergencyContactPhone: patient.emergencyContactPhone,
                medicalHistory: patient.medicalHistory,
            },
        });

    } catch (error) {
        console.error("Get Patient Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const updatePatientProfile = async (req, res) => {
    try {
        const { patientId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid patient ID.",
            });
        }

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found.",
            });
        }

        const user = await User.findById(patient.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const {
            name,
            gender,
            dateOfBirth,
            bloodGroup,
            phone,
            address,
            emergencyContactName,
            emergencyContactPhone,
        } = req.body;

        if (
            !name ||
            !gender ||
            !dateOfBirth ||
            !bloodGroup ||
            !phone ||
            !address ||
            !emergencyContactName ||
            !emergencyContactPhone
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const normalizedName = name.trim();
        const normalizedAddress = address.trim();
        const normalizedEmergencyContactName =
            emergencyContactName.trim();

        if (!normalizedName) {
            return res.status(400).json({
                success: false,
                message: "Patient name cannot be empty.",
            });
        }

        if (!normalizedAddress) {
            return res.status(400).json({
                success: false,
                message: "Address cannot be empty.",
            });
        }

        if (!normalizedEmergencyContactName) {
            return res.status(400).json({
                success: false,
                message: "Emergency contact name cannot be empty.",
            });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must contain exactly 10 digits.",
            });
        }

        if (!/^\d{10}$/.test(emergencyContactPhone)) {
            return res.status(400).json({
                success: false,
                message: "Emergency contact phone must contain exactly 10 digits.",
            });
        }

        const validGenders = ["Male", "Female", "Other"];

        if (!validGenders.includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender.",
            });
        }

        const dob = new Date(dateOfBirth);

        if (isNaN(dob.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date of birth.",
            });
        }

        if (dob > new Date()) {
            return res.status(400).json({
                success: false,
                message: "Date of birth cannot be in the future.",
            });
        }

        user.name = normalizedName;

        patient.gender = gender;
        patient.dateOfBirth = dob;
        patient.bloodGroup = bloodGroup;
        patient.phone = phone;
        patient.address = normalizedAddress;
        patient.emergencyContactName = normalizedEmergencyContactName;
        patient.emergencyContactPhone = emergencyContactPhone;

        await Promise.all([
            user.save(),
            patient.save(),
        ]);

        return res.status(200).json({
            success: true,
            message: "Patient profile updated successfully.",
            data: {
                patientId: patient._id,
                userId: user._id,
                name: user.name,
                email: user.email,
                gender: patient.gender,
                dateOfBirth: patient.dateOfBirth,
                bloodGroup: patient.bloodGroup,
                phone: patient.phone,
                address: patient.address,
                emergencyContactName: patient.emergencyContactName,
                emergencyContactPhone: patient.emergencyContactPhone,
            },
        });

    } catch (error) {
        console.error("Update Patient Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const updatePatientStatus = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid patient ID.",
            });
        }

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be either true or false.",
            });
        }

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found.",
            });
        }

        const user = await User.findById(patient.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (user.isActive === isActive) {
            return res.status(409).json({
                success: false,
                message: `Patient is already ${
                    isActive ? "active" : "inactive"
                }.`,
            });
        }

        user.isActive = isActive;

        await user.save();

        return res.status(200).json({
            success: true,
            message: `Patient ${
                isActive ? "activated" : "deactivated"
            } successfully.`,
            data: {
                patientId: patient._id,
                userId: user._id,
                name: user.name,
                email: user.email,
                isActive: user.isActive,
            },
        });

    } catch (error) {
        console.error("Update Patient Status Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};