import React, { useState, } from "react";
import { Search } from "lucide-react";
import { searchDoctor , updateDoctorStatus } from "../services/doctorService.js";
import { useNavigate } from "react-router-dom";


const SearchDoctor = () => {
    const [query, setQuery] = useState("");
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            setError("Please enter doctor name or email.");
            setDoctor(null);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await searchDoctor(query);

            if (response.count === 0) {
                setDoctor(null);
                setError("No doctor found.");
            } else {
                setDoctor(response.doctors[0]);
            }
        } catch (err) {
            setDoctor(null);
            setError(
                err.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async () => {
    try {
        const response = await updateDoctorStatus(
            doctor._id,
            !doctor.userId.isActive
        );

        console.log(response);

        setDoctor((prev) => ({
            ...prev,
            userId: {
                ...prev.userId,
                isActive: response.data.isActive,
            },
        }));
    } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log(error);

        alert(error.response?.data?.message);
    }
};
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Search Doctor
                </h1>

                <p className="mt-2 text-slate-500">
                    Search doctors by name or email.
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <form
                    onSubmit={handleSearch}
                    className="flex gap-4"
                >
                    <div className="relative flex-1">

                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Enter doctor name or email..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-[#0097B2] px-8 font-semibold text-white transition hover:bg-[#007B91] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>

                </form>

                {error && (
                    <p className="mt-4 text-red-500">
                        {error}
                    </p>
                )}
                {doctor && (
                    <div className="mt-8 rounded-xl border border-gray-200 bg-slate-50 p-6">

                        <div className="mb-6 flex items-center justify-between">

                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {doctor.userId.name}
                                </h2>

                                <p className="mt-1 text-slate-500">
                                    {doctor.specialization}
                                </p>
                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${doctor.userId.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {doctor.userId.isActive ? "Active" : "Inactive"}
                            </span>

                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Email
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {doctor.userId.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Qualification
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {doctor.qualification}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Experience
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {doctor.experience} Years
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Consultation Fee
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    ₹ {doctor.consultationFee}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Working Hours
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {doctor.workingHours.start} - {doctor.workingHours.end}
                                </p>
                            </div>

                        </div>

                        <div className="mt-8 flex justify-end gap-4">

                            <button
                                onClick={handleStatusChange}
                                className={`rounded-lg px-6 py-3 font-semibold text-white transition ${doctor.userId.isActive
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {doctor.userId.isActive
                                    ? "Deactivate Doctor"
                                    : "Activate Doctor"}
                            </button>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/admin/doctors/update-profile/${doctor._id}`
                                    )
                                }
                                className="rounded-lg bg-[#0097B2] px-6 py-3 font-semibold text-white transition hover:bg-[#007B91]"
                            >
                                Update Profile
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SearchDoctor;