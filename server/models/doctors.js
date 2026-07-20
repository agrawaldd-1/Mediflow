import mongoose from "mongoose";

import { User } from "./user.js";

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    consultationFee: {
        type: Number,
        required: true,
        min: 0
    },
    workingHours: {
        start: {
            type : Number,
            required : true 
        },
        end: {
            type : Number , 
            required : true
        }
    }
}, {
    timestamps: true,
})


export const Doctor = mongoose.model("Doctor", doctorSchema)