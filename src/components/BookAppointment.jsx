import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { searchPatient } from "../services/patientService";
import { searchDoctor } from "../services/doctorService";
import { bookAppointment } from "../services/appointmentService";

const BookAppointment = () => {

    const [patient, setPatient] = useState(null);
    const [doctor, setDoctor] = useState(null);

    const [patientQuery, setPatientQuery] = useState("");
    const [doctorQuery, setDoctorQuery] = useState("");

    const [loadingPatient, setLoadingPatient] = useState(false);
    const [loadingDoctor, setLoadingDoctor] = useState(false);

    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm();

    const handlePatientSearch = async () => {

        if (!patientQuery.trim()) return;

        try {

            setLoadingPatient(true);

            const response = await searchPatient(
                patientQuery
            );

            if (response.count > 0) {
                setPatient(response.patients[0]);
            } else {
                setPatient(null);
                alert("Patient not found.");
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to search patient."
            );

        } finally {

            setLoadingPatient(false);

        }

    };

    const handleDoctorSearch = async () => {

        if (!doctorQuery.trim()) return;

        try {

            setLoadingDoctor(true);

            const response = await searchDoctor(
                doctorQuery
            );

            if (response.count > 0) {
                setDoctor(response.doctors[0]);
            } else {
                setDoctor(null);
                alert("Doctor not found.");
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to search doctor."
            );

        } finally {

            setLoadingDoctor(false);

        }

    };

    const onSubmit = async (data) => {

        setServerError("");
        setSuccessMessage("");

        if (!patient) {
            return setServerError(
                "Please select a patient."
            );
        }

        if (!doctor) {
            return setServerError(
                "Please select a doctor."
            );
        }

        try {

            const appointmentData = {
                patientId: patient._id,
                doctorId: doctor._id,
                appointmentDateTime:
                    data.appointmentDateTime,
                reasonForVisit:
                    data.reasonForVisit,
            };

            const response =
                await bookAppointment(
                    appointmentData
                );

            if (response.success) {

                setSuccessMessage(
                    response.message
                );

                setPatient(null);
                setDoctor(null);
                setPatientQuery("");
                setDoctorQuery("");
            }

        } catch (error) {

            setServerError(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    return (
        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Book Appointment
                </h1>

                <p className="mt-2 text-slate-500">
                    Schedule a new appointment for a patient.
                </p>

            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                >

                    {/* Patient Search */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Search Patient
                        </label>

                        <div className="flex gap-3">

                            <input
                                type="text"
                                value={patientQuery}
                                onChange={(e) =>
                                    setPatientQuery(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter patient name or email"
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            <button
                                type="button"
                                onClick={
                                    handlePatientSearch
                                }
                                className="rounded-lg bg-[#0097B2] px-6 font-semibold text-white hover:bg-[#007B91]"
                            >
                                {loadingPatient
                                    ? "Searching..."
                                    : "Search"}
                            </button>

                        </div>
                        </div>
                                            {/* Selected Patient */}

                    {patient && (
                        <div className="rounded-lg border bg-slate-50 p-5">

                            <h3 className="mb-3 text-lg font-semibold text-slate-800">
                                Selected Patient
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Name
                                    </p>

                                    <p className="font-semibold">
                                        {patient.userId.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Email
                                    </p>

                                    <p className="font-semibold">
                                        {patient.userId.email}
                                    </p>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* Doctor Search */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Search Doctor
                        </label>

                        <div className="flex gap-3">

                            <input
                                type="text"
                                value={doctorQuery}
                                onChange={(e) =>
                                    setDoctorQuery(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter doctor name or email"
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            <button
                                type="button"
                                onClick={
                                    handleDoctorSearch
                                }
                                className="rounded-lg bg-[#0097B2] px-6 font-semibold text-white hover:bg-[#007B91]"
                            >
                                {loadingDoctor
                                    ? "Searching..."
                                    : "Search"}
                            </button>

                        </div>

                    </div>

                    {/* Selected Doctor */}

                    {doctor && (
                        <div className="rounded-lg border bg-slate-50 p-5">

                            <h3 className="mb-3 text-lg font-semibold text-slate-800">
                                Selected Doctor
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Name
                                    </p>

                                    <p className="font-semibold">
                                        {doctor.userId.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Specialization
                                    </p>

                                    <p className="font-semibold">
                                        {doctor.specialization}
                                    </p>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* Appointment Details */}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Appointment Date & Time
                            </label>

                            <input
                                type="datetime-local"
                                {...register(
                                    "appointmentDateTime",
                                    {
                                        required:
                                            "Appointment date & time is required",
                                    }
                                )}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.appointmentDateTime && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors
                                            .appointmentDateTime
                                            .message
                                    }
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Reason For Visit
                            </label>

                            <input
                                type="text"
                                placeholder="Enter reason"
                                {...register(
                                    "reasonForVisit",
                                    {
                                        required:
                                            "Reason for visit is required",
                                    }
                                )}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.reasonForVisit && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors
                                            .reasonForVisit
                                            .message
                                    }
                                </p>
                            )}

                        </div>

                    </div>

                    {serverError && (
                        <p className="text-center text-red-500">
                            {serverError}
                        </p>
                    )}

                    {successMessage && (
                        <p className="text-center text-green-600">
                            {successMessage}
                        </p>
                    )}

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-[#0097B2] px-8 py-3 font-semibold text-white transition hover:bg-[#007B91] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubmitting
                                ? "Booking..."
                                : "Book Appointment"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default BookAppointment;