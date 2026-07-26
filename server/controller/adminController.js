import { Doctor } from "../models/doctors.js";
import { Patient } from "../models/patients.js";
import { Appointment } from "../models/appointments.js";
import { Invoice } from "../models/invoice.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const [
            doctorCountResult,
            patientCountResult,
            revenueResult,
            totalBookedAppointments,
            totalCompletedAppointments,
            totalCanceledAppointments,
            totalAppointments,
            pendingPayments,
        ] = await Promise.all([
            Doctor.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: "$user",
                },
                {
                    $match: {
                        "user.isActive": true,
                    },
                },
                {
                    $count: "totalDoctors",
                },
            ]),

            Patient.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: "$user",
                },
                {
                    $match: {
                        "user.isActive": true,
                    },
                },
                {
                    $count: "totalPatients",
                },
            ]),

            Invoice.aggregate([
                {
                    $match: {
                        paymentStatus: "Paid",
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$totalAmount",
                        },
                    },
                },
            ]),

            Appointment.countDocuments({
                status: "Booked",
            }),

            Appointment.countDocuments({
                status: "Completed",
            }),

            Appointment.countDocuments({
                status: "Canceled",
            }),

            Appointment.countDocuments(),

            Invoice.countDocuments({
                paymentStatus: "Pending",
            }),
        ]);

        const totalDoctors =
            doctorCountResult.length > 0
                ? doctorCountResult[0].totalDoctors
                : 0;

        const totalPatients =
            patientCountResult.length > 0
                ? patientCountResult[0].totalPatients
                : 0;

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;

        return res.status(200).json({
            success: true,
            dashboard: {
                totalDoctors,
                totalPatients,
                totalRevenue,
                totalBookedAppointments,
                totalCompletedAppointments,
                totalCanceledAppointments,
                totalAppointments,
                pendingPayments,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};