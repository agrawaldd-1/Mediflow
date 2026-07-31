import React, { useState } from "react";
import heroImage from "./assets/hero-1.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { loginUser } from "./services/authService";
import { useAuth } from "./context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const redirectByRole = (role) => {
        switch (role) {
            case "admin":
                navigate("/admin/dashboard");
                break;

            case "receptionist":
                navigate("/receptionist/dashboard");
                break;

            case "doctor":
                navigate("/doctor/dashboard");
                break;

            case "patient":
                navigate("/patient/dashboard");
                break;

            default:
                navigate("/login");
        }
    };

    const onSubmit = async (data) => {
        setServerError("");

        try {
            const response = await loginUser(data);

            if (!response.success) return;

            const { token, user } = response;

            login(token, user);

            redirectByRole(user.role);
        } catch (error) {
            setServerError(
                error.response?.data?.message || "Something went wrong."
            );
        }
    };

    return (
        <section className="min-h-screen grid lg:grid-cols-2 bg-[#F8FAFC]">
            {/* Left Side */}
            <div
                className="hidden lg:flex bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(22,50,79,0.65), rgba(22,50,79,0.65)), url(${heroImage})`,
                }}
            />

            {/* Right Side */}
            <div className="flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#16324F]">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Sign in to continue to your account
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#16324F]">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition duration-300 focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#16324F]">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition duration-300 focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                            />

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {serverError && (
                            <p className="text-center text-sm text-red-500">
                                {serverError}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-[#0097B2] py-3 font-semibold text-white transition duration-300 hover:bg-[#007B91] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;