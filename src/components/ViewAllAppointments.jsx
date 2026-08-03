import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cancelAppointment, getAllAppointments } from "../services/appointmentService";

const ViewAllAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {

        try {

            const response = await getAllAppointments();

            setAppointments(response.appointments);
            setFilteredAppointments(response.appointments);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        const value = search.toLowerCase();

        const filtered = appointments.filter((appointment) =>

            appointment.patientId.userId.name
                .toLowerCase()
                .includes(value) ||

            appointment.doctorId.userId.name
                .toLowerCase()
                .includes(value)

        );

        setFilteredAppointments(filtered);

    }, [search, appointments]);

    const handleCancelAppointment = async (appointmentId) => {

        try {

            await cancelAppointment(appointmentId);

            fetchAppointments();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to cancel appointment."
            );

        }

    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading Appointments...
                </h2>
            </div>
        );
    }

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    View Appointments
                </h1>

                <p className="mt-2 text-slate-500">
                    View and manage all upcoming appointments.
                </p>

            </div>

            <div className="relative mb-6">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search by patient or doctor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                />

            </div>

            <div className="space-y-5">

                {filteredAppointments.length === 0 && (

                    <div className="rounded-xl border bg-white p-8 text-center shadow-sm">

                        <h2 className="text-lg font-semibold text-gray-500">
                            No Appointments Found
                        </h2>

                    </div>

                )}

                {filteredAppointments.map((appointment) => (

                    <div
                        key={appointment._id}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >
                                                <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-bold text-slate-800">
                                    {appointment.patientId.userId}
                                </h2>

                                <p className="mt-1 text-slate-500">
                                     {appointment.doctorId.userId}
                                </p>

                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                    appointment.status === "Booked"
                                        ? "bg-blue-100 text-blue-700"
                                        : appointment.status === "Completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {appointment.status}
                            </span>

                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Appointment Date
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {new Date(
                                        appointment.appointmentDateTime
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Appointment Time
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {new Date(
                                        appointment.appointmentDateTime
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>

                            </div>

                            <div className="md:col-span-2">

                                <p className="text-sm font-medium text-slate-500">
                                    Reason For Visit
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {appointment.reasonForVisit}
                                </p>

                            </div>

                        </div>

                        <div className="mt-8 flex justify-end">

                            {appointment.status === "Booked" && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleCancelAppointment(
                                            appointment._id
                                        )
                                    }
                                    className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                                >
                                    Cancel Appointment
                                </button>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default ViewAllAppointments;