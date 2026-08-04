import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPrescription } from "../services/prescriptionService.js";
import { getPatientDetails } from "../services/appointmentService";
import toast from "react-hot-toast";
const CreatePrescription = () => {

    const navigate = useNavigate();

    const { appointmentId } = useParams();

    const [appointment, setAppointment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        diagnosis: "",
        instructions: "",
        followUpDate: "",
    });

    const [medicines, setMedicines] = useState([
        {
            medicineName: "",
            dosage: "",
            frequency: "",
            duration: "",
        },
    ]);

    useEffect(() => {

        fetchAppointment();

    }, []);

    const fetchAppointment = async () => {

        try {

            const response =
                await getPatientDetails(
                    appointmentId
                );

            setAppointment(response.appointment);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load appointment."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleMedicineChange = (
        index,
        field,
        value
    ) => {

        const updated = [...medicines];

        updated[index][field] = value;

        setMedicines(updated);

    };

    const addMedicine = () => {

        setMedicines([
            ...medicines,
            {
                medicineName: "",
                dosage: "",
                frequency: "",
                duration: "",
            },
        ]);

    };

    const removeMedicine = (index) => {

        if (medicines.length === 1) return;

        setMedicines(
            medicines.filter(
                (_, i) => i !== index
            )
        );

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            await createPrescription({

                appointmentId,

                diagnosis:
                    formData.diagnosis,

                medicines,

                instructions:
                    formData.instructions,

                followUpDate:
                    formData.followUpDate,

            });

            toast.success(
                "Prescription created successfully."
            );

            navigate("/doctor");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create prescription."
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <div className="flex h-full items-center justify-center text-xl font-semibold text-slate-600">
                Loading...
            </div>
        );

    }

    return (

        <section className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-slate-800">
                    Create Prescription
                </h1>

                <p className="mt-2 text-slate-500">
                    Write diagnosis and medicines for the patient.
                </p>

            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm">

                <div className="mb-8 grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block font-medium">
                            Patient Name
                        </label>

                        <input
                            value={
                                appointment.patientId.userId.name
                            }
                            disabled
                            className="w-full rounded-lg border bg-gray-100 px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Appointment Date
                        </label>

                        <input
                            value={new Date(
                                appointment.appointmentDateTime
                            ).toLocaleString()}
                            disabled
                            className="w-full rounded-lg border bg-gray-100 px-4 py-3"
                        />

                    </div>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                                        <div>

                        <div className="mb-3 flex items-center justify-between">

                            <h2 className="text-2xl font-semibold text-slate-700">
                                Medicines
                            </h2>

                            <button
                                type="button"
                                onClick={addMedicine}
                                className="rounded-lg bg-[#0097B2] px-5 py-2 font-medium text-white hover:bg-[#007b91]"
                            >
                                Add Medicine
                            </button>

                        </div>

                        <div className="space-y-6">

                            {medicines.map((medicine, index) => (

                                <div
                                    key={index}
                                    className="rounded-xl border p-6"
                                >

                                    <div className="grid gap-5 md:grid-cols-2">

                                        <div>

                                            <label className="mb-2 block font-medium">
                                                Medicine Name
                                            </label>

                                            <input
                                                type="text"
                                                value={medicine.medicineName}
                                                onChange={(e) =>
                                                    handleMedicineChange(
                                                        index,
                                                        "medicineName",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0097B2]"
                                                required
                                            />

                                        </div>

                                        <div>

                                            <label className="mb-2 block font-medium">
                                                Dosage
                                            </label>

                                            <input
                                                type="text"
                                                value={medicine.dosage}
                                                onChange={(e) =>
                                                    handleMedicineChange(
                                                        index,
                                                        "dosage",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0097B2]"
                                                required
                                            />

                                        </div>

                                        <div>

                                            <label className="mb-2 block font-medium">
                                                Frequency
                                            </label>

                                            <input
                                                type="text"
                                                value={medicine.frequency}
                                                onChange={(e) =>
                                                    handleMedicineChange(
                                                        index,
                                                        "frequency",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0097B2]"
                                                required
                                            />

                                        </div>

                                        <div>

                                            <label className="mb-2 block font-medium">
                                                Duration
                                            </label>

                                            <input
                                                type="text"
                                                value={medicine.duration}
                                                onChange={(e) =>
                                                    handleMedicineChange(
                                                        index,
                                                        "duration",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0097B2]"
                                                required
                                            />

                                        </div>

                                    </div>

                                    {medicines.length > 1 && (

                                        <div className="mt-5 text-right">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeMedicine(index)
                                                }
                                                className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    )}

                                </div>

                            ))}

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Diagnosis
                        </label>

                        <textarea
                            rows={4}
                            name="diagnosis"
                            value={formData.diagnosis}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0097B2]"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Instructions
                        </label>

                        <textarea
                            rows={4}
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0097B2]"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Follow Up Date
                        </label>

                        <input
                            type="date"
                            name="followUpDate"
                            value={formData.followUpDate}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0097B2]"
                        />

                    </div>

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="rounded-lg border border-gray-300 px-8 py-3 font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-[#0097B2] px-8 py-3 font-semibold text-white hover:bg-[#007b91] disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Create Prescription"}
                        </button>

                    </div>

                </form>

            </div>

        </section>

    );

};

export default CreatePrescription;