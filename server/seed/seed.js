import { connect_db } from "../config/db.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });
await connect_db();
const doctor = {
    name: "Dr. John Smith",
    email: "doctor@mediflow.com",
    password: "12345678",
    role: "doctor",
    isActive: true
};

const receptionist = {
    name: "Reception Desk",
    email: "reception@mediflow.com",
    password: "12345678",
    role: "receptionist",
    isActive: true
};



const registerUser = async (person) => {
    const existingUser = await User.findOne({ email: person.email.toLowerCase() });
    if (existingUser) {
        return existingUser;
    }


    const hashedPassword = await bcrypt.hash(person.password, 10);

    // Create User
    const user = await User.create({
        name: person.name,
        email: person.email.toLowerCase(),
        password: hashedPassword,
        role: person.role,
        isActive: person.isActive,
    });

    console.log(`${user.name} register successfully`)
}

await registerUser(doctor);
await registerUser(receptionist);