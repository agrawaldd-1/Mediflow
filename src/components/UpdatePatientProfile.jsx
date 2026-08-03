import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    getPatientById,
    updatePatientProfile,
} from "../services/patientService";

const UpdatePatientProfile = () => {

    const { patientId } = useParams();
    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {

        const fetchPatient = async () => {

            try {

                const response = await getPatientById(patientId);

                if (response.success) {

                    const patient = response.patient;

                    reset({
                        name: patient.userId.name,
                        gender: patient.gender,
                        dateOfBirth:
                            patient.dateOfBirth?.split("T")[0],
                        bloodGroup: patient.bloodGroup,
                        phone: patient.phone,
                        address: patient.address,
                        emergencyContactName:
                            patient.emergencyContactName,
                        emergencyContactPhone:
                            patient.emergencyContactPhone,
                        medicalHistory:
                            patient.medicalHistory,
                    });

                }

            } catch (error) {

                setServerError(
                    error.response?.data?.message ||
                    "Failed to load patient details."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchPatient();

    }, [patientId, reset]);

    const onSubmit = async (data) => {

        setServerError("");
        setSuccessMessage("");

        try {

            const response = await updatePatientProfile(
                patientId,
                data
            );

            if (response.success) {
                setSuccessMessage(response.message);
            }

        } catch (error) {

            setServerError(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <h2 className="text-xl font-semibold text-slate-600">
                    Loading Patient...
                </h2>
            </div>
        );
    }

    return (
        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Update Patient Profile
                </h1>

                <p className="mt-2 text-slate-500">
                    Update patient information.
                </p>

            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Gender
                            </label>

                            <select
                                {...register("gender", {
                                    required: "Gender is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                            {errors.gender && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.gender.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                {...register("dateOfBirth", {
                                    required: "Date of birth is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.dateOfBirth && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.dateOfBirth.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Blood Group
                            </label>

                            <input
                                type="text"
                                {...register("bloodGroup", {
                                    required: "Blood group is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.bloodGroup && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.bloodGroup.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                {...register("phone", {
                                    required: "Phone number is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}

                        </div>
                                                <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Address
                            </label>

                            <textarea
                                rows={3}
                                {...register("address", {
                                    required: "Address is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.address && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.address.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Emergency Contact Name
                            </label>

                            <input
                                type="text"
                                {...register("emergencyContactName", {
                                    required:
                                        "Emergency contact name is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.emergencyContactName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.emergencyContactName
                                            .message
                                    }
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Emergency Contact Phone
                            </label>

                            <input
                                type="text"
                                {...register(
                                    "emergencyContactPhone",
                                    {
                                        required:
                                            "Emergency contact phone is required",
                                    }
                                )}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.emergencyContactPhone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors
                                            .emergencyContactPhone
                                            .message
                                    }
                                </p>
                            )}

                        </div>

                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Medical History
                            </label>

                            <textarea
                                rows={4}
                                {...register("medicalHistory")}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

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

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/receptionist/patients")
                            }
                            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-[#0097B2] px-8 py-3 font-semibold text-white transition hover:bg-[#007B91] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubmitting
                                ? "Updating..."
                                : "Update Profile"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UpdatePatientProfile;