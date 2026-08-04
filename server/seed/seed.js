import mongoose from "mongoose";
import dotenv from "dotenv";

import { connect_db } from "../config/db.js";
import { Appointment } from "../models/appointments.js";
import { Invoice } from "../models/invoice.js"; // apni file name ke hisaab se

dotenv.config({ path: ".env" });

await connect_db();

await Appointment.deleteMany({});
await Invoice.deleteMany({});

console.log("Appointments Deleted");
console.log("Invoices Deleted");

await mongoose.connection.close();
process.exit(0);