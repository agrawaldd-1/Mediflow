import mongoose from "mongoose";
import { Invoice } from "../models/invoice.js";
import { Doctor } from "../models/doctors.js"
import { Patient } from "../models/patients.js";
import { User } from "../models/user.js";

import { generateInvoiceNumber } from "../utils/generateInvoiceNumber.js";

export const generateInvoice = async (req, res) => {
    try {
        const { patientId, doctorId, services, paymentMethod } = req.body
        if (!patientId || !doctorId || services == null || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Doctor ID"
            });
        }
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Patient ID"
            });
        }
        if (services.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Their should be atleast one service"
            })
        }
        const doctor = await Doctor.findById(doctorId).populate("userId", "name");
        const patient = await Patient.findById(patientId).populate("userId", "name");
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            })
        }
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            })
        }
        const invoiceNumber = await generateInvoiceNumber();
        const updatedServices = services.map((service) => {
            return {
                ...service,
                totalPrice: service.quantity * service.unitPrice
            };
        });
        const subtotal = updatedServices.reduce((sum, service) => sum + service.totalPrice, 0);
        const tax = (subtotal * 18) / 100;
        const total = subtotal + tax;

        const invoice = await Invoice.create({
            invoiceNumber,
            patient: patientId,
            doctor: doctorId,
            services: updatedServices,
            subtotal: subtotal,
            tax: tax,
            totalAmount: total,
            paymentMethod,
        });
        return res.status(201).json({
            success: true,
            message: "Invoice generated successfully.",
            invoice,
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

export const viewInvoice = async (req, res) => {
    try {
        const { invoiceNumber } = req.params;

        // Validate invoice number
        if (!invoiceNumber || isNaN(invoiceNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Invoice Number",
            });
        }

        const invoice = await Invoice.findOne({
            invoiceNumber: Number(invoiceNumber),
        })
            .populate({
                path: "patient",
                populate: {
                    path: "userId",
                    select: "name",
                },
            })
            .populate({
                path: "doctor",
                populate: {
                    path: "userId",
                    select: "name",
                },
            });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            invoice,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const searchInvoice = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Search query is required."
            })
        }
        const users = await User.find({
            name: {
                $regex: name,
                $options: "i"
            }
        })
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Users not found"
            })
        }
        const patients = await Patient.find({ userId: { $in: users.map(user => user._id) } }).populate("userId", "name")
        if (patients.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Patients not found"
            })
        }

        const invoices = await Invoice.find({
            patient: {
                $in: patients.map(patient => patient._id)
            }
        })
            .populate({
                path: "patient",
                populate: {
                    path: "userId",
                    select: "name"
                }
            })
            .populate({
                path: "doctor",
                populate: {
                    path: "userId",
                    select: "name"
                }
            });

        if (invoices.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Users not found"
            })
        }
        return res.status(200).json({
            success: true,
            invoices
        })
    }
    catch (error) {
        console.error("Error fetching Invoices:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const updatePaymentStatus = async (req, res) => {
    try {
        const { invoiceNumber } = req.params;
        const { paymentStatus } = req.body;

        // Validate Invoice Number
        if (!invoiceNumber || isNaN(invoiceNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Invoice Number",
            });
        }

        // Validate Payment Status
        if (!paymentStatus) {
            return res.status(400).json({
                success: false,
                message: "Payment status is required.",
            });
        }

        const validStatuses = ["Pending", "Paid"];

        if (!validStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment status.",
            });
        }

        // Find Invoice
        const invoice = await Invoice.findOne({ invoiceNumber });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found.",
            });
        }

        // Check if already updated
        if (invoice.paymentStatus === paymentStatus) {
            return res.status(400).json({
                success: false,
                message: `Invoice is already marked as ${paymentStatus}.`,
            });
        }

        // Update Payment Status
        invoice.paymentStatus = paymentStatus;
        await invoice.save();

        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully.",
            invoice,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};