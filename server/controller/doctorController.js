import bcrypt from "bcrypt"
import { Doctor } from "../models/doctors.js";
import { User } from "../models/user.js";

export const registerDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, qualification, experience, consultationFee , workingHours } = req.body;
        if (!name || !email || !password || !specialization || !qualification || !experience || !consultationFee || !workingHours) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "doctor"
        });
        const doctor = await Doctor.create({
            userId: user._id,
            specialization,
            qualification,
            experience,
            consultationFee,
            workingHours
        })

        return res.status(201).json({
            success: true,
            message: "Doctor registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
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

// get all the doctors

export const getAllDoctors = async (req, res) => {
    try{
        const doctors = await Doctor.find().populate("userId", "name email").sort({ createdAt: -1 });

    if (doctors.length == 0) {
        return res.status(200).json({
            success: true,
            count: 0,
            message: "No doctors found",
            doctors: [],
        })
    }
    return res.status(200).json({
        success : true,
        count : doctors.length,
        doctors
    })
    }
    catch(error){
        console.error("Error fetching Doctors:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    }
}

export const searchDoctor = async (req, res) => {
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
    const doctor = await Doctor.find({ userId: { $in: users.map(user => user._id) } }).populate("userId", "name email")

    return res.status(200).json({
      success: true,
      count: doctor.length,
      doctor
    })
  }
  catch (error) {
    console.error("Error fetching Doctors:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const getDoctorById = async(req,res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate("userId", "name email")
    if(!doctor){
      return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
    }
    return res.status(200).json({
      success: true,
      doctor
    })
  }
  catch (error) {
    console.error("Error fetching Doctors:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
