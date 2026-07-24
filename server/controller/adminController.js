import { Doctor } from "../models/doctors.js";
import { Patient } from "../models/patients.js";
import { Appointment } from "../models/appointments.js";
import { User } from "../models/user.js";
import { Receptionist } from "../models/receptionist.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const [
            doctorCountResult,
            patientCountResult,
            totalBookedAppointments,
            totalCompletedAppointments,
            totalCanceledAppointments,
            totalAppointments
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
            Appointment.countDocuments({status : "Booked"}),
            Appointment.countDocuments({status : "Completed"}),
            Appointment.countDocuments({status : "Canceled"}),
            Appointment.countDocuments()
        ]);

        const totalDoctors =
            doctorCountResult.length > 0? doctorCountResult[0].totalDoctors: 0;

        const totalPatients =patientCountResult.length > 0?patientCountResult[0].totalPatients : 0;

       

        return res.status(200).json({
            success: true,
            dashboard: {
                totalDoctors,
                totalPatients,
                totalBookedAppointments,
                totalCompletedAppointments,
                totalCanceledAppointments,
                totalAppointments,
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

