import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        // Find User
        const user = await User.findOne({ email: email.toLowerCase() });
        console.log("User:", user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Entered Password:", password);
        console.log("Stored Password:", user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        if(!user.isActive){
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Please contact the hospital administration."
            })
        }
        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
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

// Protected Route
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};