import mongoose from "mongoose";
import { User } from "./user.js";
const receptionistSchema = new mongoose.Schema({
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
    
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true,
})

export const Receptionist = mongoose.model("Receptionist" , receptionistSchema);