import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {
  getMedicalHistory,
  getUpcomingAppointment,
} from "../services/patientService.js";

const PatientDashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [upcomingResponse, medicalHistoryResponse] =
          await Promise.all([
            getUpcomingAppointment(),
            getMedicalHistory(),
          ]);

        setUpcomingAppointments(upcomingResponse.appointments);
        setMedicalHistory(medicalHistoryResponse.medicalHistory);
      } catch (error) {
        console.error("Patient Dashboard Error:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Patient Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Welcome back! Here's your health overview.
            </p>
          </div>

          {/* Upcoming Appointments */}

          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-700">
              Upcoming Appointments
            </h2>

            {upcomingAppointments.length === 0 ? (
              <p className="text-slate-500">
                No upcoming appointments found.
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left">Doctor</th>
                    <th className="py-3 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {upcomingAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="border-b border-gray-100"
                    >
                      <td className="py-4">
                        {appointment.doctorId.userId.name}
                      </td>

                      <td className="py-4">
                        {new Date(
                          appointment.appointmentDateTime
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Medical History */}

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-700">
              Medical History
            </h2>

            {medicalHistory.length === 0 ? (
              <p className="text-slate-500">
                No medical history found.
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left">Doctor</th>
                    <th className="py-3 text-left">Specialization</th>
                    <th className="py-3 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {medicalHistory.map((record) => (
                    <tr
                      key={record._id}
                      className="border-b border-gray-100"
                    >
                      <td className="py-4">
                        {record.doctorId.userId.name}
                      </td>

                      <td className="py-4">
                        {record.doctorId.specialization}
                      </td>

                      <td className="py-4">
                        {new Date(
                          record.appointmentDateTime
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;