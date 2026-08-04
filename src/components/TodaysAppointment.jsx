import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Clock3,
    User,
    Phone,
    Stethoscope,
    RefreshCw,
} from "lucide-react";

import { getTodaysAppointment } from "../services/doctorService.js";

const TodayAppointments = () => {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchTodayAppointments = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getTodaysAppointment();

            setAppointments(response.appointments || []);

        } catch (err) {

            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Failed to load today's appointments."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTodayAppointments();

    }, []);
    return (
        <section className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-800">
                        Today's Appointments
                    </h1>

                    <p className="mt-2 text-lg text-slate-500">
                        View and manage today's scheduled consultations.
                    </p>

                </div>

                <button
                    onClick={fetchTodayAppointments}
                    className="flex items-center gap-2 rounded-lg bg-[#0097B2] px-5 py-3 font-medium text-white transition hover:bg-[#007B91]"
                >
                    <RefreshCw size={18} />
                    Refresh
                </button>

            </div>

            {/* Loading */}

            {loading && (

                <div className="rounded-xl border bg-white p-8 text-center shadow-sm">

                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#0097B2] border-t-transparent"></div>

                    <p className="text-lg text-slate-500">
                        Loading today's appointments...
                    </p>

                </div>

            )}

            {/* Error */}

            {!loading && error && (

                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">

                    {error}

                </div>

            )}

            {/* Empty State */}

            {!loading &&
                !error &&
                appointments.length === 0 && (

                    <div className="rounded-xl border bg-white p-10 text-center shadow-sm">

                        <CalendarDays
                            size={70}
                            className="mx-auto mb-4 text-slate-300"
                        />

                        <h2 className="text-2xl font-semibold text-slate-700">

                            No Appointments Today

                        </h2>

                        <p className="mt-2 text-slate-500">

                            You don't have any scheduled appointments for today.

                        </p>

                    </div>

                )}

            {!loading &&
                !error &&
                appointments.length > 0 && (

                    <div className="space-y-5">
                        {appointments.map((appointment) => {
                            console.log(appointment._id);


                            return(
                            <div
                                key={appointment._id}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
                            >

                                <div className="flex flex-col justify-between gap-6 lg:flex-row">

                                    {/* Left Section */}

                                    <div className="flex-1 space-y-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100">

                                                <User
                                                    size={28}
                                                    className="text-[#0097B2]"
                                                />

                                            </div>

                                            <div>

                                                <h2 className="text-2xl font-bold text-slate-800">

                                                    {
                                                        appointment.patientId
                                                            ?.userId?.name
                                                    }

                                                </h2>

                                                <p className="text-slate-500">

                                                    Appointment ID :
                                                    {" "}
                                                    {appointment._id.slice(-8)}

                                                </p>

                                            </div>

                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">

                                            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">

                                                <CalendarDays
                                                    className="text-[#0097B2]"
                                                    size={22}
                                                />

                                                <div>

                                                    <p className="text-sm text-slate-500">
                                                        Date
                                                    </p>

                                                    <p className="font-semibold">

                                                        {new Date(
                                                            appointment.appointmentDateTime
                                                        ).toLocaleDateString()}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">

                                                <Clock3
                                                    className="text-[#0097B2]"
                                                    size={22}
                                                />

                                                <div>

                                                    <p className="text-sm text-slate-500">
                                                        Time
                                                    </p>

                                                    <p className="font-semibold">

                                                        {new Date(
                                                            appointment.appointmentDateTime
                                                        ).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">

                                                <Phone
                                                    className="text-[#0097B2]"
                                                    size={22}
                                                />

                                                <div>

                                                    <p className="text-sm text-slate-500">
                                                        Contact
                                                    </p>

                                                    <p className="font-semibold">

                                                        {appointment.patientId?.phone}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">

                                                <Stethoscope
                                                    className="text-[#0097B2]"
                                                    size={22}
                                                />

                                                <div>

                                                    <p className="text-sm text-slate-500">
                                                        Status
                                                    </p>

                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                                        {appointment.status}

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Right Section */}

                                    <div className="flex flex-col justify-center gap-3 lg:w-52">

                                        <button className="rounded-lg bg-[#0097B2] px-5 py-3 font-semibold text-white transition hover:bg-[#007B91]">

                                            View Details

                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(`/doctor/prescriptions/${appointment._id}`)
                                            }
                                            className="rounded-lg border border-[#0097B2] px-5 py-3 font-semibold text-[#0097B2] transition hover:bg-[#0097B2] hover:text-white"
                                        >
                                            Write Prescription
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )})}
                    </div>

                )}

        </section>

    );

};

export default TodayAppointments;