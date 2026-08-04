import { Receptionist } from "../models/receptionist.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Appointment } from "../models/appointments.js";

import { Invoice } from "../models/invoice.js";


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

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits.",
      });
    }

    const validGenders = ["Male", "Female", "Other"];

    if (!validGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender.",
      });
    }

    const dob = new Date(dateOfBirth);

    if (isNaN(dob.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date of birth.",
      });
    }

    if (dob > new Date()) {
      return res.status(400).json({
        success: false,
        message: "Date of birth cannot be in the future.",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "receptionist",
    });

    const receptionist = await Receptionist.create({
      userId: user._id,
      gender,
      dateOfBirth: dob,
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
    console.error("Register Receptionist Error:", error);

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
        message: "Search query is required.",
      });
    }

    const search = name.trim();

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query cannot be empty.",
      });
    }

    const users = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
      role: "receptionist",
    });

    const receptionists = await Receptionist.find({
      userId: {
        $in: users.map((user) => user._id),
      },
    }).populate({
      path: "userId",
      select: "name email isActive",
    });

    if (receptionists.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        receptionists: [],
        message: "No receptionist found.",
      });
    }

    return res.status(200).json({
      success: true,
      count: receptionists.length,
      receptionists,
    });

  } catch (error) {
    console.error("Search Receptionist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const updateReceptionist = async (req, res) => {
  try {
    const { receptionistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(receptionistId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid receptionist ID.",
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

    const validGenders = ["Male", "Female", "Other"];

    if (!validGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender.",
      });
    }

    const dob = new Date(dateOfBirth);

    if (isNaN(dob.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date of birth.",
      });
    }

    if (dob > new Date()) {
      return res.status(400).json({
        success: false,
        message: "Date of birth cannot be in the future.",
      });
    }

    user.name = normalizedName;

    receptionist.gender = gender;
    receptionist.dateOfBirth = dob;
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
    console.error("Update Receptionist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const updateReceptionistStatus = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  try {
    const { receptionistId } = req.params;
    const { isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(receptionistId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid receptionist ID.",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be either true or false.",
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

    if (user.isActive === isActive) {
      return res.status(409).json({
        success: false,
        message: `Receptionist is already ${isActive ? "active" : "inactive"
          }.`,
      });
    }

    user.isActive = isActive;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `Receptionist ${isActive ? "activated" : "deactivated"
        } successfully.`,
      data: {
        receptionistId: receptionist._id,
        userId: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      },
    });

  } catch (error) {
    console.error("Update Receptionist Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getReceptionistDashboard = async (req, res) => {
  try {
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const [doctorAppointments, pendingPayments] = await Promise.all([

      Appointment.aggregate([
        {
          $match: {
            appointmentDateTime: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: "$doctorId",
            totalAppointments: {
              $sum: 1,
            },
          },
        },
        {
          $lookup: {
            from: "doctors",
            localField: "_id",
            foreignField: "_id",
            as: "doctor",
          },
        },
        {
          $unwind: "$doctor",
        },
        {
          $lookup: {
            from: "users",
            localField: "doctor.userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 0,
            doctorName: "$user.name",
            totalAppointments: 1,
          },
        },
        {
          $sort: {
            totalAppointments: -1,
          },
        },
      ]),

      Invoice.countDocuments({
        paymentStatus: "Pending",
      }),

    ]);

    return res.status(200).json({
      success: true,
      dashboard: {
        doctorAppointments,
        pendingPayments,
      },
    });

  } catch (error) {
    console.error("Get Receptionist Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getReceptionistById = async (req, res) => {
    try {
        const { receptionistId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(receptionistId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid receptionist ID.",
            });
        }

        const receptionist = await Receptionist.findById(
            receptionistId
        ).populate(
            "userId",
            "name email isActive"
        );

        if (!receptionist) {
            return res.status(404).json({
                success: false,
                message: "Receptionist not found.",
            });
        }

        return res.status(200).json({
            success: true,
            receptionist,
        });

    } catch (error) {
        console.error("Get Receptionist By ID Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};