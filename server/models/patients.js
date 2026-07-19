import mongoose, { mongo } from "mongoose";
import { User } from "./user.js";



const patientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"]
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    emergencyContactName: {
        type: String,
        required: true
    },
    emergencyContactPhone: {
        type: String,
        required: true
    },
    medicalHistory: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
})

export const Patient = mongoose.model("Patient" , patientSchema);