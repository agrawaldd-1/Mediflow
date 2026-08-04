import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    getAllPatients,
    updatePatientStatus,
} from "../services/patientService";
import toast from "react-hot-toast";
const ViewPatient = () => {

    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {

            const response = await getAllPatients();
            console.log(response.patients);

response.patients.forEach((patient) => {
    console.log(patient.userId);
});

            setPatients(response.patients);
            setFilteredPatients(response.patients);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        const value = search.toLowerCase();

        const filtered = patients.filter((patient) =>
            patient.userId?.name.toLowerCase().includes(value) ||
            patient.userId?.email.toLowerCase().includes(value) ||
            patient.phone.includes(value)
        );

        setFilteredPatients(filtered);

    }, [search, patients]);

    const handleStatus = async (patientId, currentStatus) => {

        try {

            await updatePatientStatus(
                patientId,
                !currentStatus
            );

            fetchPatients();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update patient status."
            );

        }

    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading Patients...
                </h2>
            </div>
        );
    }

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    All Patients
                </h1>

                <p className="mt-2 text-slate-500">
                    View and manage all registered patients.
                </p>

            </div>

            <div className="relative mb-6">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search patient by name, email or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                />

            </div>

            <div className="space-y-5">

                {filteredPatients.length === 0 && (

                    <div className="rounded-xl border bg-white p-8 text-center shadow-sm">

                        <h2 className="text-lg font-semibold text-gray-500">
                            No Patients Found
                        </h2>

                    </div>

                )}

                {filteredPatients.map((patient) => (

                    <div
                        key={patient._id}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-bold text-slate-800">
                                    {patient.userId?.name}
                                </h2>

                                <p className="mt-1 text-slate-500">
                                    {patient.bloodGroup}
                                </p>

                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                    patient.userId?.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {patient.userId?.isActive
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
                                    {patient.userId?.email}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Phone Number
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {patient.phone}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Gender
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {patient.gender}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Date of Birth
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {new Date(
                                        patient.dateOfBirth
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Emergency Contact
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {patient.emergencyContactName}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Emergency Phone
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {patient.emergencyContactPhone}
                                </p>

                            </div>

                            <div className="md:col-span-2">

                                <p className="text-sm font-medium text-slate-500">
                                    Address
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {patient.address}
                                </p>

                            </div>

                            <div className="md:col-span-2">

                                <p className="text-sm font-medium text-slate-500">
                                    Medical History
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    {patient.medicalHistory || "No medical history"}
                                </p>

                            </div>

                        </div>

                        <div className="mt-8 flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() =>
                                    handleStatus(
                                        patient._id,
                                        patient.userId?.isActive
                                    )
                                }
                                className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
                                    patient.userId?.isActive
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-green-600 hover:bg-green-700"
                                }`}
                            >
                                {patient.userId?.isActive
                                    ? "Deactivate"
                                    : "Activate"}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/receptionist/patients/update-profile/${patient._id}`
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

export default ViewPatient;