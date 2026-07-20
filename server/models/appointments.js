import mongoose from "mongoose";
import { Patient } from "./patients.js";
import { User } from "./user.js";

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    appointmentDateTime :{
        type : Date,
        required : true
    },
    reasonForVisit : {
        type : String,
        required : true,
        trim : true
    },
    status : {
        type : String,
        enum : ["Booked", "Completed" , "Canceled"],
        default : "Booked",
    }
},{
    timestamps : true,
})

export const Appointment = mongoose.model("Appointment",appointmentSchema);