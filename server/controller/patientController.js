import bcrypt from "bcrypt"
import { Patient } from "../models/patients.js";
import { User } from "../models/user.js";

export const registerPatient = async (req, res) => {
  try {
    const { name, email, password, gender, dateOfBirth, bloodGroup, phone, address, emergencyContactName, emergencyContactPhone, medicalHistory } = req.body;
    // Validation
    if (!name || !email || !password || !gender || !dateOfBirth || !bloodGroup || !phone || !address || !emergencyContactName || !emergencyContactPhone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "patient"
    });
    const patient = await Patient.create({
      userId: user._id,
      gender,
      dateOfBirth,
      bloodGroup,
      phone,
      address,
      emergencyContactName,
      emergencyContactPhone,
      medicalHistory
    })

    return res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
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



export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    if (patients.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        message: "No patients found",
        patients: [],
      });
    }

    return res.status(200).json({
      success: true,
      count: patients.length,
      patients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const searchPatient = async (req, res) => {
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
    const patient = await Patient.find({ userId: { $in: users.map(user => user._id) } }).populate("userId", "name email")

    return res.status(200).json({
      success: true,
      count: patient.length,
      patient
    })
  }
  catch (error) {
    console.error("Error fetching patients:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const getPatientById = async(req,res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id).populate("userId", "name email")
    if(!patient){
      return res.status(404).json({
                success: false,
                message: "patient not found",
            });
    }
    return res.status(200).json({
      success: true,
      patient
    })
  }
  catch (error) {
    console.error("Error fetching patients:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
