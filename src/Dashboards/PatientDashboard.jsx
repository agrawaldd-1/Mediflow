import { useEffect, useState } from "react";
import {
  getUpcomingAppointment,
  getMedicalHistory,
} from "../services/patientService";
import { useNavigate } from "react-router-dom";
const PatientDashboard = () => {
  const navigate = useNavigate();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const [medicalHistory, setMedicalHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const [
          upcomingResponse,
          medicalHistoryResponse,
        ] = await Promise.all([
          getUpcomingAppointment(),
          getMedicalHistory(),
        ]);

        setUpcomingAppointments(
          upcomingResponse.appointments
        );

        setMedicalHistory(
          medicalHistoryResponse.medicalHistory
        );

      } catch (error) {

        console.error(
          "Patient Dashboard Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchDashboard();

  }, []);

  if (loading) {

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

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Patient Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's your health overview.
        </p>

      </div>

      <div className="mb-10">

        <h2 className="mb-5 text-xl font-semibold text-slate-700">
          Upcoming Appointments
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          {upcomingAppointments.length === 0 ? (

            <p className="text-slate-500">
              No upcoming appointments found.
            </p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="py-3 text-left">
                    Doctor
                  </th>

                  <th className="py-3 text-left">
                    Date
                  </th>

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

      </div>

      <div>

        <h2 className="mb-5 text-xl font-semibold text-slate-700">
          Medical History
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          {medicalHistory.length === 0 ? (

            <p className="text-slate-500">
              No medical history found.
            </p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="py-3 text-left">
                    Doctor
                  </th>

                  <th className="py-3 text-left">
                    Specialization
                  </th>

                  <th className="py-3 text-left">
                    Date
                  </th>

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
                    <td className="py-4 text-center">

                      <button
                        onClick={() =>
                          navigate(`/patient/prescriptions/${record._id}`)
                        }
                        className="rounded-lg bg-[#0097B2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#007B91]"
                      >
                        View Prescription
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </>

  );

};

export default PatientDashboard;