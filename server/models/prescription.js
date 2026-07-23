import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    dosage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    frequency: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Once a day",
        "Twice a day",
        "Three times a day",
        "Four times a day",
        "Every 6 hours",
        "Every 8 hours",
        "Every 12 hours",
        "SOS",
      ],
    },

    duration: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
  },
  {
    _id: false,
  }
);

const prescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      index: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },

    diagnosis: {
      type: String,
      required: [true, "Diagnosis is required"],
      trim: true,
      maxlength: 1000,
    },

    medicines: {
      type: [medicineSchema],
      required: true,
      validate: {
        validator: (medicines) => medicines.length > 0,
        message: "At least one medicine must be prescribed.",
      },
    },

    instructions: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    followUpDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);



export const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema
);