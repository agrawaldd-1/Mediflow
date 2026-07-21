import { Patient } from "../models/patients.js";
import { User } from "../models/user.js";
import { Doctor } from "../models/doctors.js";
import { Appointment } from "../models/appointments.js";

export const bookAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDateTime, reasonForVisit } = req.body;
        if (!patientId || !doctorId || !appointmentDateTime || !reasonForVisit) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const currentTime = new Date();
        const appointmentTime = new Date(appointmentDateTime);
        if (appointmentTime <= currentTime) {
            return res.status(400).json({
                success: false,
                message: "Appointment cannot be booked for a past date and time."
            })
        }

        const minutes = appointmentTime.getMinutes();
        const milliSeconds = appointmentTime.getMilliseconds();
        const seconds = appointmentTime.getSeconds();
        if (seconds !== 0 || milliSeconds !== 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment time."
            });
        }
        if (minutes !== 0 && minutes !== 30) {
            return res.status(400).json({
                success: false,
                message: "Appointments can only be booked at 00 or 30 minutes. "
            })
        }


        const patient = await Patient.findById(patientId).populate("userId", "isActive");
        const doctor = await Doctor.findById(doctorId).populate("userId", "isActive");

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient Does not Exist"
            })
        }
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor Does not Exist"
            })
        }
        if (!patient.userId.isActive) {
            return res.status(403).json({
                success: false,
                message: "Patient is not Active"
            })
        }
        if (!doctor.userId.isActive) {
            return res.status(403).json({
                success: false,
                message: "Doctor is not Active"
            })
        }
        const hours = appointmentTime.getHours();
        if (hours < doctor.workingHours.start || hours > doctor.workingHours.end) {
            return res.status(400).json({
                success: false,
                message: "Doctor is not available at this time"
            })
        }


        const existingAppointment = await Appointment.findOne({ doctorId, appointmentDateTime, status: "Booked" })

        if (existingAppointment) {
            return res.status(409).json({
                success: false,
                message: "Slot already booked"
            })
        }

        const appointment = await Appointment.create({
            patientId,
            doctorId,
            appointmentDateTime,
            reasonForVisit,
        })
        return res.status(201).json({
            success: true,
            message: "Appointment Booked  successfully",
            appointment
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
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const existingAppointment = await Appointment.findById(id);
        if (!existingAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment does not exist"
            })
        }
        if (existingAppointment.status === "Completed") {
            return res.status(409).json({
                success: false,
                message: "Completed appointments cannot be canceled."
            })
        }
        if (existingAppointment.status === "Canceled") {
            return res.status(409).json({
                success: false,
                message: "Appointment already canceled"
            })
        }
        existingAppointment.status = "Canceled"
        await existingAppointment.save()
        return res.status(200).json({
            success: true,
            message: "Appointment canceled successfully.",
            existingAppointment
        })
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }



}

export const completeAppointment = async (req, res) => {
    try {

        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment does not exist"
            })
        }
        if (appointment.status === "Completed") {
            return res.status(409).json({
                success: false,
                message: "appointment is already completed"
            })
        }
        if (appointment.status === "Canceled") {
            return res.status(409).json({
                success: false,
                message: "Canceled appointment cannot be completed"
            })
        }
        const currentTime = new Date();
        const appointmentTime = new Date(appointment.appointmentDateTime);
        if (currentTime < appointmentTime) {
            return res.status(400).json({
                success: false,
                message: "Future appointments cannot be completed"
            })
        }
        appointment.status = "Completed"
        await appointment.save()
        return res.status(200).json({
            success: true,
            message: "Appointment completed successfully.",
            appointment
        })
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}

export const getDoctorsAvailability = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Date query parameter is required."
            })
        }
        const { doctorId } = req.params;
        const doctor = await Doctor.findById(doctorId).populate("userId", "isActive")
        if (!doctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor not found",
            });
        }
        if (!doctor.userId.isActive) {
            return res.status(400).json({
                success: false,
                message: "Doctor is not Active"
            })
        }
        const selectedDate = new Date(date);
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);
        const appointments = await Appointment.find({
            doctorId,
            appointmentDateTime: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            status: "Booked"
        });

        const bookedSlots = new Set();

        for (const appointment of appointments) {
            const appointmentTime = new Date(appointment.appointmentDateTime);

            const hour = String(appointmentTime.getHours()).padStart(2, "0");
            const minute = String(appointmentTime.getMinutes()).padStart(2, "0");

            bookedSlots.add(`${hour}:${minute}`);
        }

        const slots = [];

        let currentTime = new Date(selectedDate);
        currentTime.setHours(doctor.workingHours.start, 0, 0, 0);

        let endTime = new Date(selectedDate);
        endTime.setHours(doctor.workingHours.end, 0, 0, 0);

        while (currentTime < endTime) {

            const hour = String(currentTime.getHours()).padStart(2, "0");
            const minute = String(currentTime.getMinutes()).padStart(2, "0");

            const slot = `${hour}:${minute}`;

            slots.push({
                time: slot,
                available: !bookedSlots.has(slot),
            });

            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }

        return res.status(200).json({
            success: true,
            doctor: doctor.userId.name,
            date,
            slots,
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

export const getAllAppointments = async(req,res)=>{
    try{
    
    const currentDateTime = new Date();
    const appointments = await Appointment.find({appointmentDateTime :{$gte : currentDateTime}}).sort({appointmentDateTime : 1})
    .populate({path : "patientId" , populate : {path : "userId" ,select : "name"}})
    .populate({path : "doctorId" , populate : {path : "userId" , select : "name"}})

    if(appointments.length == 0){
        return res.status(200).json({
            success : true,
            count : 0,
            message : "No new appointments"
        })
    }
    return res.status(200).json({
        success : true,
        count : appointments.length,
        appointments
    })
}

catch(error){
    console.error("Error fetching Appointments:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
}
}