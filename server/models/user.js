import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true
    },
    password:{
        type : String,
        required : true,
        minlength: 8
    },
    role : {
        type : String,
        required : true,
        enum: ["patient", "doctor", "receptionist","admin"]
    },
    isActive : {
        type : Boolean,
        default : true
    },
},
{
    timestamps: true,
})

export const User = mongoose.model("User" , userSchema);