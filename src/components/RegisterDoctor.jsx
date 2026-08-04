import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerDoctor } from "../services/doctorService";

const RegisterDoctor = () => {
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

    const doctorData = {
      ...data,
      experience: Number(data.experience),
      consultationFee: Number(data.consultationFee),
      workingHours: {
        start: (data.workingHours.start),
        end: (data.workingHours.end),
      },
    };

    try {
      const response = await registerDoctor(doctorData);

      if (response.success) {
        setSuccessMessage(response.message);
        reset();
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Register Doctor
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new doctor account.
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
                placeholder="Enter doctor's name"
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
                    message: "Password must be at least 6 characters",
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
                Specialization
              </label>

              <input
                type="text"
                placeholder="Enter specialization"
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
                placeholder="Enter qualification"
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
                placeholder="Enter experience"
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
                placeholder="Enter consultation fee"
                {...register("consultationFee", {
                  required: "Consultation fee is required",
                  min: {
                    value: 0,
                    message: "Consultation fee cannot be negative",
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

                <select
                  {...register("workingHours.start", {
                    required: "Start time is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                >
                  <option value="">Select Start Time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>

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

                <select
                  {...register("workingHours.end", {
                    required: "End time is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                  <option value="19:00">07:00 PM</option>
                  <option value="20:00">08:00 PM</option>
                </select>

                {errors.workingHours?.end && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.workingHours.end.message}
                  </p>
                )}
              </div>

            </div>
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
              ? "Registering Doctor..."
              : "Register Doctor"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterDoctor;