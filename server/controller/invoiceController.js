import mongoose from "mongoose";
import { Invoice } from "../models/invoice.js";
import { Doctor } from "../models/doctors.js"
import { Patient } from "../models/patients.js";
import { User } from "../models/user.js";

import { generateInvoiceNumber } from "../utils/generateInvoiceNumber.js";

export const generateInvoice = async (req, res) => {
    try {
        const {
            patientId,
            doctorId,
            services,
            paymentMethod,
        } = req.body;

        if (
            !patientId ||
            !doctorId ||
            !Array.isArray(services) ||
            services.length === 0 ||
            !paymentMethod
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid patient ID.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID.",
            });
        }

        const doctor = await Doctor.findById(doctorId).populate(
            "userId",
            "name"
        );

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found.",
            });
        }

        const patient = await Patient.findById(patientId).populate(
            "userId",
            "name"
        );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found.",
            });
        }

        const updatedServices = services.map((service) => {
            if (
                !service.serviceName ||
                service.quantity == null ||
                service.unitPrice == null
            ) {
                throw new Error("Invalid service data.");
            }

            if (service.quantity <= 0 || service.unitPrice < 0) {
                throw new Error("Service quantity and price must be valid.");
            }

            return {
                serviceName: service.serviceName.trim(),
                quantity: Number(service.quantity),
                unitPrice: Number(service.unitPrice),
                totalPrice:
                    Number(service.quantity) *
                    Number(service.unitPrice),
            };
        });

        const subtotal = updatedServices.reduce(
            (sum, service) => sum + service.totalPrice,
            0
        );

        const tax = (subtotal * 18) / 100;
        const totalAmount = subtotal + tax;

        const invoiceNumber = await generateInvoiceNumber();

        const invoice = await Invoice.create({
            invoiceNumber,
            patient: patientId,
            doctor: doctorId,
            services: updatedServices,
            subtotal,
            tax,
            totalAmount,
            paymentMethod,
        });

        return res.status(201).json({
            success: true,
            message: "Invoice generated successfully.",
            invoice,
        });

    } catch (error) {
        if (
            error.message === "Invalid service data." ||
            error.message ===
            "Service quantity and price must be valid."
        ) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        console.error("Generate Invoice Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const viewInvoice = async (req, res) => {
    try {
        const { invoiceNumber } = req.params;

        if (!invoiceNumber || isNaN(invoiceNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid invoice number.",
            });
        }

        const invoice = await Invoice.findOne({
            invoiceNumber: Number(invoiceNumber),
        })
            .populate({
                path: "patient",
                populate: {
                    path: "userId",
                    select: "name email",
                },
            })
            .populate({
                path: "doctor",
                populate: {
                    path: "userId",
                    select: "name email",
                },
            });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found.",
            });
        }

        return res.status(200).json({
            success: true,
            invoice,
        });

    } catch (error) {
        console.error("View Invoice Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const searchInvoice = async (req, res) => {
    try {
        const { query } = req.query;

        const search = query?.trim();

        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Search query is required.",
            });
        }

        const users = await User.find({
            name: {
                $regex: search,
                $options: "i",
            },
        });

        const patients = await Patient.find({
            userId: {
                $in: users.map((user) => user._id),
            },
        });

        const invoices = await Invoice.find({
            patient: {
                $in: patients.map((patient) => patient._id),
            },
        })
            .populate({
                path: "patient",
                populate: {
                    path: "userId",
                    select: "name email",
                },
            })
            .populate({
                path: "doctor",
                populate: {
                    path: "userId",
                    select: "name email",
                },
            });

        if (invoices.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                message: "No invoices found.",
                invoices: [],
            });
        }

        return res.status(200).json({
            success: true,
            count: invoices.length,
            invoices,
        });

    } catch (error) {
        console.error("Search Invoice Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

export const updatePaymentStatus = async (req, res) => {
    console.log("=== UPDATE PAYMENT STATUS API HIT ===");
    console.log(req.params);
    console.log(req.body);
    try {
        const { invoiceNumber } = req.params;
        const { paymentStatus } = req.body;

        if (!invoiceNumber || isNaN(invoiceNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid invoice number.",
            });
        }

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

        const invoice = await Invoice.findOne({
            invoiceNumber: Number(invoiceNumber),
        });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found.",
            });
        }

        if (invoice.paymentStatus === paymentStatus) {
            return res.status(409).json({
                success: false,
                message: `Invoice is already marked as ${paymentStatus}.`,
            });
        }

        invoice.paymentStatus = paymentStatus;

        await invoice.save();

        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully.",
            invoice,
        });

    } catch (error) {
        console.error("Update Payment Status Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};