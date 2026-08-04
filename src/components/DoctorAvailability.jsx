import React, { useState } from "react";
import { Search } from "lucide-react";
import {
    searchDoctor,
    getDoctorAvailability,
} from "../services/doctorService";
import toast from "react-hot-toast";

const DoctorAvailability = () => {
    const [bookedSlots, setBookedSlots] = useState([]);
    const [search, setSearch] = useState("");
    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [loadingDoctor, setLoadingDoctor] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const handleSearch = async () => {

        if (!search.trim()) return;

        setLoadingDoctor(true);

        try {

            const response = await searchDoctor(search);

            if (response.count > 0) {

                setDoctor(response.doctors[0]);
                setSlots([]);

            } else {

                toast.error("Doctor not found.");

                setDoctor(null);

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to search doctor."
            );

        } finally {

            setLoadingDoctor(false);

        }

    };

    const handleAvailability = async () => {

        if (!doctor || !date) {

            toast("Select doctor and date first.");

            return;

        }

        setLoadingSlots(true);

        try {

            const response = await getDoctorAvailability(
                doctor._id,
                date
            );

            setSlots(response.availableSlots);
            setBookedSlots(response.bookedSlots);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch availability."
            );

        } finally {

            setLoadingSlots(false);

        }

    };

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Doctor Availability
                </h1>

                <p className="mt-2 text-slate-500">
                    Search a doctor and check available appointment slots.
                </p>

            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search doctor by name..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-40 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                    />

                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={loadingDoctor}
                        className="absolute right-2 top-2 rounded-lg bg-[#0097B2] px-6 py-2 text-white transition hover:bg-[#007B91]"
                    >
                        {loadingDoctor
                            ? "Searching..."
                            : "Search"}
                    </button>

                </div>

                {doctor && (

                    <div className="mt-8 rounded-xl border p-6">

                        <h2 className="text-2xl font-bold text-slate-800">
                            {doctor.userId.name}
                        </h2>

                        <p className="mt-1 text-slate-500">
                            {doctor.specialization}
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">
                                    Select Date
                                </label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) =>
                                        setDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                                />

                            </div>

                            <div className="flex items-end">

                                <button
                                    type="button"
                                    onClick={handleAvailability}
                                    disabled={loadingSlots}
                                    className="rounded-lg bg-[#0097B2] px-8 py-3 font-semibold text-white transition hover:bg-[#007B91]"
                                >
                                    {loadingSlots
                                        ? "Loading..."
                                        : "Check Availability"}
                                </button>

                            </div>

                        </div>
                        <div className="mt-8">

                            <h3 className="mb-4 text-xl font-semibold text-slate-800">
                                Available Time Slots
                            </h3>

                            {loadingSlots ? (

                                <div className="rounded-lg border bg-slate-50 p-6 text-center">
                                    <p className="text-slate-600">
                                        Loading available slots...
                                    </p>
                                </div>

                            ) : slots.length === 0 ? (

                                <div className="rounded-lg border bg-slate-50 p-6 text-center">

                                    <p className="text-slate-600">
                                        No available slots for the selected date.
                                    </p>

                                </div>

                            ) : (

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                                    {slots.map((slot) => (

                                        <div
                                            key={slot}
                                            className="rounded-lg border border-green-300 bg-green-50 py-4 text-center font-semibold text-green-700"
                                        >
                                            {slot}
                                        </div>

                                    ))}

                                    {bookedSlots.map((slot) => (

                                        <div
                                            key={slot}
                                            className="rounded-lg border border-red-300 bg-red-50 py-4 text-center font-semibold text-red-700"
                                        >
                                            {slot}
                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};

export default DoctorAvailability;