import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        min : 1,
        required: true
    },
    unitPrice: {
        type: Number,
        min : 0,
        required: true
    },
    totalPrice: {
        type: Number,
        min : 0,
        required: true
    }
})
const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        unique : true,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    services: {
        type: [servicesSchema],
        required: true,
        validate: {
            validator: (service) => service.length > 0,
            message: "At least one service must be in bill.",
        },
    },
    subtotal : {
        type : Number,
        min : 0,
        required : true
    },
    tax : {
        type : Number,
        min : 0,
        required : true
    },
    totalAmount : {
        type : Number,
        min : 0,
        required : true
    },
    paymentMethod : {
        type : String,
        enum : ["Cash" , "UPI" , "Card" , "Net Banking"],
        required : true
    },
    paymentStatus : {
        type : String,
        enum : ["Pending" , "Paid" , "Cancelled"],
        default : "Pending",
        required : true
    }

},
{
    timestamps: true,
})

export const Invoice = mongoose.model("Invoice" , invoiceSchema)