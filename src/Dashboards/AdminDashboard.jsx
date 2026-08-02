import React, { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/adminService.js";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { dashboard } = await getAdminDashboard();
        setDashboard(dashboard);
      } catch (error) {
        console.error(error);
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
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's today's hospital overview.
        </p>
      </div>

      {/* Hospital Overview */}
      <div className="mb-10">
        <h2 className="mb-5 text-xl font-semibold text-slate-700">
          Hospital Overview
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-500">Total Doctors</p>
            <h2 className="mt-4 text-4xl font-bold text-blue-600">
              {dashboard.totalDoctors}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-500">Total Patients</p>
            <h2 className="mt-4 text-4xl font-bold text-green-600">
              {dashboard.totalPatients}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-500">Revenue</p>
            <h2 className="mt-4 text-4xl font-bold text-emerald-600">
              ₹ {dashboard.totalRevenue.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-500">Pending Payments</p>
            <h2 className="mt-4 text-4xl font-bold text-red-500">
              {dashboard.pendingPayments}
            </h2>
          </div>
        </div>
      </div>

      {/* Appointment Analytics */}
      <div>
        <h2 className="mb-5 text-xl font-semibold text-slate-700">
          Appointment Analytics
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-500">Booked</p>
            <h2 className="mt-4 text-4xl font-bold text-blue-600">
              {dashboard.totalBookedAppointments}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-500">Completed</p>
            <h2 className="mt-4 text-4xl font-bold text-green-600">
              {dashboard.totalCompletedAppointments}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-500">Cancelled</p>
            <h2 className="mt-4 text-4xl font-bold text-red-500">
              {dashboard.totalCanceledAppointments}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-500">Total Appointments</p>
            <h2 className="mt-4 text-4xl font-bold text-indigo-600">
              {dashboard.totalAppointments}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;