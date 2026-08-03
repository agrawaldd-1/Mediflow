import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerPatient } from "../services/patientService";

const RegisterPatient = () => {
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        setServerError("");
        setSuccessMessage("");

        try {
            const response = await registerPatient(data);

            if (response.success) {
                setSuccessMessage(response.message);
                reset();
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
                    Register Patient
                </h1>

                <p className="mt-2 text-slate-500">
                    Register a new patient.
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
                                placeholder="Enter full name"
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
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}

                        </div>


                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
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
                                    required: "Date of Birth is required",
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

                            <select
                                {...register("bloodGroup", {
                                    required: "Blood group is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>

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
                                type="tel"
                                placeholder="Enter phone number"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message:
                                            "Phone number must contain exactly 10 digits",
                                    },
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}

                        </div>


                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Emergency Contact Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter emergency contact name"
                                {...register("emergencyContactName", {
                                    required:
                                        "Emergency contact name is required",
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.emergencyContactName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.emergencyContactName.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Emergency Contact Phone
                            </label>

                            <input
                                type="tel"
                                placeholder="Enter emergency contact phone"
                                {...register("emergencyContactPhone", {
                                    required:
                                        "Emergency contact phone is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message:
                                            "Emergency contact phone must contain exactly 10 digits",
                                    },
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            {errors.emergencyContactPhone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.emergencyContactPhone.message}
                                </p>
                            )}

                        </div>

                    </div>


                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Address
                        </label>

                        <textarea
                            rows={4}
                            placeholder="Enter address"
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
                            Medical History
                        </label>

                        <textarea
                            rows={5}
                            placeholder="Enter medical history (optional)"
                            {...register("medicalHistory")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                        />

                    </div>

                    {serverError && (
                        <p className="text-center text-sm text-red-500">
                            {serverError}
                        </p>
                    )}

                    {successMessage && (
                        <p className="text-center text-sm text-green-600">
                            {successMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-[#0097B2] py-3 font-semibold text-white transition hover:bg-[#007B91] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting
                            ? "Registering Patient..."
                            : "Register Patient"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default RegisterPatient;