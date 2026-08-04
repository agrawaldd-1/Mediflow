import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { viewPrescription } from "../services/prescriptionService";
import toast from "react-hot-toast";
const ViewPrescription = () => {

    const navigate = useNavigate();

    const { appointmentId } = useParams();

    const [prescription, setPrescription] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPrescription = async () => {

            try {

                const { prescription } =
                    await viewPrescription(
                        appointmentId
                    );

                setPrescription(prescription);

            } catch (error) {

                console.error(error);

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load prescription."
                );

                navigate(-1);

            } finally {

                setLoading(false);

            }

        };

        fetchPrescription();

    }, [appointmentId, navigate]);

    if (loading) {

        return (

            <div className="flex h-full items-center justify-center">

                <h2 className="text-xl font-semibold text-slate-600">
                    Loading Prescription...
                </h2>

            </div>

        );

    }

    return (

        <section className="space-y-8">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-800">
                        Prescription Details
                    </h1>

                    <p className="mt-2 text-slate-500">
                        View patient prescription and treatment details.
                    </p>

                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
                >
                    Back
                </button>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-5 text-xl font-semibold text-slate-700">
                        Doctor Information
                    </h2>

                    <div className="space-y-4">

                        <div>

                            <p className="text-sm text-slate-500">
                                Doctor Name
                            </p>

                            <h3 className="text-lg font-semibold text-slate-800">
                                {prescription.doctorId.userId.name}
                            </h3>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">
                                Specialization
                            </p>

                            <h3 className="text-lg font-semibold text-slate-800">
                                {prescription.doctorId.specialization}
                            </h3>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">
                                Email
                            </p>

                            <h3 className="text-lg font-semibold text-slate-800">
                                {prescription.doctorId.userId.email}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-5 text-xl font-semibold text-slate-700">
                        Patient Information
                    </h2>

                    <div className="space-y-4">

                        <div>

                            <p className="text-sm text-slate-500">
                                Patient Name
                            </p>

                            <h3 className="text-lg font-semibold text-slate-800">
                                {prescription.patientId.userId.name}
                            </h3>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">
                                Blood Group
                            </p>

                            <h3 className="text-lg font-semibold text-slate-800">
                                {prescription.patientId.bloodGroup}
                            </h3>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">
                                Email
                            </p>

                            <h3 className="text-lg font-semibold text-slate-800">
                                {prescription.patientId.userId.email}
                            </h3>

                        </div>

                    </div>

                </div>

            </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-semibold text-slate-700">
                    Diagnosis
                </h2>

                <div className="rounded-xl bg-slate-50 p-5 text-slate-700">
                    {prescription.diagnosis}
                </div>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-semibold text-slate-700">
                    Medicines
                </h2>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="py-3 text-left">
                                    Medicine
                                </th>

                                <th className="py-3 text-left">
                                    Dosage
                                </th>

                                <th className="py-3 text-left">
                                    Frequency
                                </th>

                                <th className="py-3 text-left">
                                    Duration
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {prescription.medicines.map(
                                (medicine, index) => (

                                    <tr
                                        key={index}
                                        className="border-b border-gray-100"
                                    >

                                        <td className="py-4">
                                            {medicine.medicineName}
                                        </td>

                                        <td className="py-4">
                                            {medicine.dosage}
                                        </td>

                                        <td className="py-4">
                                            {medicine.frequency}
                                        </td>

                                        <td className="py-4">
                                            {medicine.duration} days
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-semibold text-slate-700">
                    Instructions
                </h2>

                <div className="rounded-xl bg-slate-50 p-5 text-slate-700">

                    {prescription.instructions || "No instructions provided."}

                </div>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-5 text-xl font-semibold text-slate-700">
                        Follow Up Date
                    </h2>

                    <p className="text-lg font-semibold text-slate-800">

                        {prescription.followUpDate
                            ? new Date(
                                  prescription.followUpDate
                              ).toLocaleDateString()
                            : "No Follow Up Required"}

                    </p>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-5 text-xl font-semibold text-slate-700">
                        Prescription Date
                    </h2>

                    <p className="text-lg font-semibold text-slate-800">

                        {new Date(
                            prescription.createdAt
                        ).toLocaleDateString()}

                    </p>

                </div>

            </div>

        </section>

    );

};

export default ViewPrescription;