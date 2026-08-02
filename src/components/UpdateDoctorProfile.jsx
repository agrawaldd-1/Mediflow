import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDoctorById,
    updateDoctorProfile,
} from "../services/doctorService";

const UpdateDoctorProfile = () => {
    const { doctorId } = useParams();
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
        const fetchDoctor = async () => {
            try {
                const response = await getDoctorById(doctorId);

                if (response.success) {
                    const doctor = response.doctor;

                    reset({
                        name: doctor.userId.name,
                        specialization: doctor.specialization,
                        qualification: doctor.qualification,
                        experience: doctor.experience,
                        consultationFee: doctor.consultationFee,
                        workingHours: {
                            start: doctor.workingHours.start,
                            end: doctor.workingHours.end,
                        },
                    });
                }
            } catch (error) {
                setServerError(
                    error.response?.data?.message ||
                        "Failed to load doctor details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [doctorId, reset]);

    const onSubmit = async (data) => {
        setServerError("");
        setSuccessMessage("");

        try {
            const response = await updateDoctorProfile(
                doctorId,
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
                    Loading Doctor...
                </h2>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Update Doctor Profile
                </h1>

                <p className="mt-2 text-slate-500">
                    Update doctor information.
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
                                Doctor Name
                            </label>

                            <input
                                type="text"
                                {...register("name", {
                                    required: "Doctor name is required",
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
                                Specialization
                            </label>

                            <input
                                type="text"
                                {...register("specialization", {
                                    required: "Specialization is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.specialization && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.specialization.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Qualification
                            </label>

                            <input
                                type="text"
                                {...register("qualification", {
                                    required: "Qualification is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.qualification && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.qualification.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Experience (Years)
                            </label>

                            <input
                                type="number"
                                {...register("experience", {
                                    required: "Experience is required",
                                    min: {
                                        value: 0,
                                        message: "Experience cannot be negative",
                                    },
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.experience && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.experience.message}
                                </p>
                            )}
                        </div>
                                                <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Consultation Fee
                            </label>

                            <input
                                type="number"
                                {...register("consultationFee", {
                                    required: "Consultation fee is required",
                                    min: {
                                        value: 0,
                                        message:
                                            "Consultation fee cannot be negative",
                                    },
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.consultationFee && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.consultationFee.message}
                                </p>
                            )}
                        </div>

                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-slate-800">
                            Working Hours
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Start Time
                                </label>

                                <input
                                    type="time"
                                    {...register("workingHours.start", {
                                        required: "Start time is required",
                                    })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                                />

                                {errors.workingHours?.start && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.workingHours.start.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    End Time
                                </label>

                                <input
                                    type="time"
                                    {...register("workingHours.end", {
                                        required: "End time is required",
                                    })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                                />

                                {errors.workingHours?.end && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.workingHours.end.message}
                                    </p>
                                )}
                            </div>

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
                            onClick={() => navigate("/admin/doctors/search")}
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

export default UpdateDoctorProfile;