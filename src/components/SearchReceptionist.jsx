import React, { useState } from "react";
import { Search } from "lucide-react";
import {
    searchReceptionist,
    updateReceptionistStatus,
} from "../services/receptionistService";
import { useNavigate } from "react-router-dom";

const SearchReceptionist = () => {
    const [query, setQuery] = useState("");
    const [receptionist, setReceptionist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            setError("Please enter receptionist name or email.");
            setReceptionist(null);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await searchReceptionist(query);

            if (response.count === 0) {
                setReceptionist(null);
                setError("No receptionist found.");
            } else {
                setReceptionist(response.receptionists[0]);
            }
        } catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response?.data);

            setReceptionist(null);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong."
            );
        }
    };

    const handleStatusChange = async () => {
        try {
            const response = await updateReceptionistStatus(
                receptionist._id,
                !receptionist.userId.isActive
            );

            setReceptionist((prev) => ({
                ...prev,
                userId: {
                    ...prev.userId,
                    isActive: response.data.isActive,
                },
            }));

        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            console.log(error);

            alert(error.response?.data?.message || "Failed");
        }
    };

    return (
        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Search Receptionist
                </h1>

                <p className="mt-2 text-slate-500">
                    Search receptionists by name or email.
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
                            placeholder="Enter receptionist name or email..."
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

                {receptionist && (

                    <div className="mt-8 rounded-xl border border-gray-200 bg-slate-50 p-6">

                        <div className="mb-6 flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-bold text-slate-800">
                                    {receptionist.userId.name}
                                </h2>

                                <p className="mt-1 text-slate-500">
                                    Receptionist
                                </p>

                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${receptionist.userId.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {receptionist.userId.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </span>

                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Email
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {receptionist.userId.email}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Phone Number
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {receptionist.phone}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Gender
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {receptionist.gender}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Date of Birth
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {new Date(
                                        receptionist.dateOfBirth
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                            <div className="md:col-span-2">

                                <p className="text-sm font-medium text-slate-500">
                                    Address
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {receptionist.address}
                                </p>

                            </div>

                        </div>

                        <div className="mt-8 flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={handleStatusChange}
                                className={`rounded-lg px-6 py-3 font-semibold text-white transition ${receptionist.userId.isActive
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {receptionist.userId.isActive
                                    ? "Deactivate Receptionist"
                                    : "Activate Receptionist"}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/admin/receptionist/update-profile/${receptionist._id}`
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

export default SearchReceptionist;