import bcrypt from "bcrypt"
import { Patient } from "../models/patients";
import { User } from "../models/user";

export const registerPatient = async (req, res) => {
  try {
    const { name, email, password , gender , dateOfBirth , bloodGroup , phone , address , emergencyContactName , emergencyContactPhone , medicalHistory } = req.body;
    // Validation
    if (!name || !email || !password  || !gender || !dateOfBirth || !bloodGroup || !phone || !address || !emergencyContactName || !emergencyContactPhone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    

    // Check existing user
    const existingUser = await User.findOne({ email : email.toLowerCase() });

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
      email : email.toLowerCase(),
      password: hashedPassword,
      role : "patient"
    });
    const patient = await Patient.create({
        userId : user._id, 
        gender , 
        dateOfBirth , 
        bloodGroup , 
        phone , 
        address , 
        emergencyContactName , 
        emergencyContactPhone , 
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
