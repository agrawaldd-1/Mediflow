import { useEffect, useState } from "react";
import { getTodaysAppointment } from "../services/doctorService";

const DoctorDashboard = () => {

    const [todaysAppointments, setTodaysAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTodaysAppointments = async () => {

            try {

                const { appointments } =
                    await getTodaysAppointment();

                setTodaysAppointments(appointments);

            } catch (error) {

                console.error(
                    "Doctor Dashboard Error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchTodaysAppointments();

    }, []);

    if (loading) {

        return (

            <div className="flex h-full items-center justify-center">

                <h2 className="text-xl font-semibold text-slate-600">
                    Loading Today's Appointments...
                </h2>

            </div>

        );

    }

    return (

        <>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Today's Appointments
                </h1>

                <p className="mt-2 text-slate-500">
                    View and manage today's scheduled consultations.
                </p>

            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                {todaysAppointments.length === 0 ? (

                    <p className="text-slate-500">
                        No appointments scheduled for today.
                    </p>

                ) : (

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="py-3 text-left">
                                    Patient
                                </th>

                                <th className="py-3 text-left">
                                    Appointment Time
                                </th>

                                <th className="py-3 text-left">
                                    Status
                                </th>

                                <th className="py-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {todaysAppointments.map((appointment) => (

                                <tr
                                    key={appointment._id}
                                    className="border-b border-gray-100"
                                >

                                    <td className="py-4">

                                        {
                                            appointment.patientId
                                                .userId.name
                                        }

                                    </td>

                                    <td className="py-4">

                                        {new Date(
                                            appointment.appointmentDateTime
                                        ).toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}

                                    </td>

                                    <td className="py-4">

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                            {appointment.status}

                                        </span>

                                    </td>

                                    <td className="py-4 text-center">

                                        <button className="rounded-lg bg-[#0097B2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#007B91]">

                                            View Details

                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </>

    );

};

export default DoctorDashboard;