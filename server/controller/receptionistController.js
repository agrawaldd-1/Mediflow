import { Receptionist } from "../models/receptionist.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
export const registerReceptionist = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      dateOfBirth,
      phone,
      address,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !dateOfBirth ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedAddress = address.trim();

    if (!normalizedName || !normalizedAddress) {
      return res.status(400).json({
        success: false,
        message: "Invalid input.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "receptionist",
    });

    // Create Receptionist Profile
    const receptionist = await Receptionist.create({
      userId: user._id,
      gender,
      dateOfBirth,
      phone,
      address: normalizedAddress,
    });

    return res.status(201).json({
      success: true,
      message: "Receptionist registered successfully.",
      data: {
        receptionistId: receptionist._id,
        userId: user._id,
        name: user.name,
        email: user.email,
        gender: receptionist.gender,
        dateOfBirth: receptionist.dateOfBirth,
        phone: receptionist.phone,
        address: receptionist.address,
      },
    });
  } catch (error) {
    console.error("Error registering receptionist:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const searchReceptionist = async (req, res) => {
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
      },
      role : "receptionist"
    })
    const receptionist = await Receptionist.find({ userId: { $in: users.map(user => user._id) } }).populate("userId", "name email")

    return res.status(200).json({
      success: true,
      data : receptionist
    })
  }
  catch (error) {
    console.error("Error fetching receptionist:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const updateReceptionist = async (req, res) => {
  try {
    const { receptionistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(receptionistId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Receptionist ID",
      });
    }

    const receptionist = await Receptionist.findById(receptionistId);

    if (!receptionist) {
      return res.status(404).json({
        success: false,
        message: "Receptionist not found.",
      });
    }

    const user = await User.findById(receptionist.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const {
      name,
      gender,
      dateOfBirth,
      phone,
      address,
    } = req.body;

    if (
      !name ||
      !gender ||
      !dateOfBirth ||
      !phone ||
      !address 
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const normalizedName = name.trim();
    const normalizedAddress = address.trim();
    

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Receptionist name cannot be empty.",
      });
    }

    if (!normalizedAddress) {
      return res.status(400).json({
        success: false,
        message: "Address cannot be empty.",
      });
    }

    

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits.",
      });
    }

    

    const today = new Date();

    if (new Date(dateOfBirth) > today) {
      return res.status(400).json({
        success: false,
        message: "Date of birth cannot be in the future.",
      });
    }

    user.name = normalizedName;

    receptionist.gender = gender;
    receptionist.dateOfBirth = dateOfBirth;
    
    receptionist.phone = phone;
    receptionist.address = normalizedAddress;
    
    

    await Promise.all([
      user.save(),
      receptionist.save(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Receptionist details updated successfully.",
      data: {
        id: receptionist._id,
        name: user.name,
        email: user.email,
        gender: receptionist.gender,
        dateOfBirth: receptionist.dateOfBirth,
        phone: receptionist.phone,
        address: receptionist.address,
      },
    });

  } catch (error) {
    console.error("Error updating receptionist:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateReceptionistStatus = async (req, res) => {
  try {
    const { receptionistId } = req.params;
    const { isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(receptionistId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Receptionist ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false.",
      });
    }

    const receptionist = await Receptionist.findById(receptionistId);

    if (!receptionist) {
      return res.status(404).json({
        success: false,
        message: "receptionist not found.",
      });
    }

    const user = await User.findById(receptionist.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isActive === isActive) {
      return res.status(400).json({
        success: false,
        message: `receptionist is already ${
          isActive ? "active" : "inactive"
        }.`,
      });
    }

    user.isActive = isActive;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `Receptionist ${
        isActive ? "activated" : "deactivated"
      } successfully.`,
      data: {
        receptionistId: receptionist._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Error updating Receptionist status:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

