import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllDoctors, updateDoctorStatus } from "../services/doctorService";

const AllDoctors = () => {

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {

            const response = await getAllDoctors();

            setDoctors(response.doctors);
            setFilteredDoctors(response.doctors);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const filtered = doctors.filter((doctor) => {

            const value = search.toLowerCase();

            return (

                doctor.userId.name.toLowerCase().includes(value) ||

                doctor.userId.email.toLowerCase().includes(value) ||

                doctor.specialization.toLowerCase().includes(value)

            );

        });

        setFilteredDoctors(filtered);

    }, [search, doctors]);

    const handleStatus = async (doctorId, currentStatus) => {

        try {

            await updateDoctorStatus(
                doctorId,
                !currentStatus
            );

            fetchDoctors();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update doctor status."
            );

        }

    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading Doctors...
                </h2>
            </div>
        );
    }

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    All Doctors
                </h1>

                <p className="mt-2 text-slate-500">
                    View and manage all registered doctors.
                </p>

            </div>

            <div className="mb-6 relative">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search doctor by name, email or specialization..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                />

            </div>

            <div className="space-y-5">

                {filteredDoctors.length === 0 && (

                    <div className="rounded-xl bg-white p-8 text-center shadow-sm border">

                        <h2 className="text-lg font-semibold text-gray-500">
                            No Doctors Found
                        </h2>

                    </div>

                )}

                {filteredDoctors.map((doctor) => (

                    <div
                        key={doctor._id}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-bold text-slate-800">

                                    {doctor.userId.name}

                                </h2>

                                <p className="mt-1 text-slate-500">

                                    {doctor.specialization}

                                </p>

                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                    doctor.userId.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {doctor.userId.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </span>

                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                type="button"
                                onClick={() =>
                                    handleStatus(
                                        doctor._id,
                                        doctor.userId.isActive
                                    )
                                }
                                className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
                                    doctor.userId.isActive
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-green-600 hover:bg-green-700"
                                }`}
                            >
                                {doctor.userId.isActive
                                    ? "Deactivate"
                                    : "Activate"}
                            </button>

                            <button
                                type="button"
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

                ))}

            </div>

        </div>

    );

};

export default AllDoctors;