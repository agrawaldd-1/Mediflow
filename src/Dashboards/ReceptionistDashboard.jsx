import React, { useEffect, useState } from "react";
import { getReceptionistDashboard } from "../services/receptionistService.js";

const ReceptionistDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { dashboard } = await getReceptionistDashboard();
        setDashboard(dashboard);
      } catch (error) {
        console.error(error);
        console.log("ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="flex h-full items-center justify-center">
        <h2 className="text-xl font-semibold text-slate-600">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Receptionist Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's today's overview.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pending Payments */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">
            Pending Payments
          </h2>

          <h1 className="mt-6 text-5xl font-bold text-blue-600">
            {dashboard.pendingPayments}
          </h1>

          <p className="mt-3 text-slate-500">
            Pending Invoices
          </p>
        </div>

        {/* Doctor Appointments */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-5 text-lg font-semibold text-slate-700">
            Doctor Appointments
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left text-slate-600">
                    Doctor
                  </th>

                  <th className="py-3 text-right text-slate-600">
                    Today's Appointments
                  </th>
                </tr>
              </thead>

              <tbody>
                {dashboard.doctorAppointments.map(
                  (doctor, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 transition hover:bg-slate-50"
                    >
                      <td className="py-4 text-slate-700">
                        {doctor.doctorName}
                      </td>

                      <td className="py-4 text-right font-semibold text-blue-600">
                        {doctor.totalAppointments}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceptionistDashboard;