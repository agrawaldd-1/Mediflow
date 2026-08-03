import React, { useState } from "react";
import { Search, User, Stethoscope, Receipt } from "lucide-react";

import { searchPatient } from "../services/patientService";
import { searchDoctor } from "../services/doctorService";
import { generateInvoice } from "../services/invoiceService";

const GenerateInvoice = () => {

    const [patientQuery, setPatientQuery] = useState("");
    const [doctorQuery, setDoctorQuery] = useState("");

    const [patient, setPatient] = useState(null);
    const [doctor, setDoctor] = useState(null);

    const [loadingPatient, setLoadingPatient] = useState(false);
    const [loadingDoctor, setLoadingDoctor] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState("Cash");

    const [services, setServices] = useState([
        {
            serviceName: "",
            quantity: 1,
            unitPrice: 0,
        },
    ]);

    const handlePatientSearch = async () => {

        if (!patientQuery.trim()) {
            return;
        }

        try {

            setLoadingPatient(true);

            const response = await searchPatient(patientQuery);

            if (response.count === 0) {
                alert("Patient not found.");
                setPatient(null);
            } else {
                setPatient(response.patients[0]);
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to search patient."
            );

        } finally {

            setLoadingPatient(false);

        }

    };

    const handleDoctorSearch = async () => {

        if (!doctorQuery.trim()) {
            return;
        }

        try {

            setLoadingDoctor(true);

            const response = await searchDoctor(doctorQuery);

            if (response.count === 0) {
                alert("Doctor not found.");
                setDoctor(null);
            } else {
                setDoctor(response.doctors[0]);
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to search doctor."
            );

        } finally {

            setLoadingDoctor(false);

        }

    };

    const handleServiceChange = (
        index,
        field,
        value
    ) => {

        const updated = [...services];

        updated[index][field] = value;

        setServices(updated);

    };

    const addService = () => {

        setServices([
            ...services,
            {
                serviceName: "",
                quantity: 1,
                unitPrice: 0,
            },
        ]);

    };

    const removeService = (index) => {

        setServices(
            services.filter((_, i) => i !== index)
        );

    };

    const subtotal = services.reduce(

        (sum, service) =>

            sum +

            (Number(service.quantity) || 0) *

                (Number(service.unitPrice) || 0),

        0

    );

    const tax = subtotal * 0.18;

    const total = subtotal + tax;

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!patient || !doctor) {

            alert("Please select patient and doctor.");

            return;

        }

        try {

            const response = await generateInvoice({

                patientId: patient._id,
                doctorId: doctor._id,
                paymentMethod,
                services,

            });

            alert(response.message);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to generate invoice."
            );

        }

    };

    return (

        <div>

            <div className="mb-10 flex items-center gap-4">

                <div className="rounded-2xl bg-[#0097B2]/10 p-4">

                    <Receipt
                        size={34}
                        className="text-[#0097B2]"
                    />

                </div>

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Generate Invoice
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Create professional invoices for patients.
                    </p>

                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <div className="grid gap-8 lg:grid-cols-2">

                    {/* Patient */}

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">

                            <User className="text-[#0097B2]" />

                            <h2 className="text-xl font-semibold">
                                Patient Details
                            </h2>

                        </div>

                        <div className="relative">

                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />

                            <input
                                type="text"
                                placeholder="Search patient..."
                                value={patientQuery}
                                onChange={(e) =>
                                    setPatientQuery(e.target.value)
                                }
                                className="w-full rounded-xl border py-3 pl-11 pr-32 outline-none focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            <button
                                type="button"
                                onClick={handlePatientSearch}
                                className="absolute right-2 top-2 rounded-lg bg-[#0097B2] px-5 py-2 font-medium text-white hover:bg-[#007B91]"
                            >
                                {loadingPatient
                                    ? "Searching..."
                                    : "Search"}
                            </button>

                        </div>

                        {patient && (
                            <div className="mt-6 rounded-xl border bg-slate-50 p-5">

                                <h3 className="text-xl font-bold text-slate-800">
                                    {patient.userId.name}
                                </h3>

                                <p className="mt-1 text-slate-500">
                                    {patient.userId.email}
                                </p>

                                <div className="mt-4 grid grid-cols-2 gap-4">

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Blood Group
                                        </p>

                                        <p className="font-semibold">
                                            {patient.bloodGroup}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Phone
                                        </p>

                                        <p className="font-semibold">
                                            {patient.phone}
                                        </p>

                                    </div>

                                </div>

                            </div>
                        )}

                    </div>
                                        {/* Doctor */}

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">

                            <Stethoscope className="text-[#0097B2]" />

                            <h2 className="text-xl font-semibold">
                                Doctor Details
                            </h2>

                        </div>

                        <div className="relative">

                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />

                            <input
                                type="text"
                                placeholder="Search doctor..."
                                value={doctorQuery}
                                onChange={(e) =>
                                    setDoctorQuery(e.target.value)
                                }
                                className="w-full rounded-xl border py-3 pl-11 pr-32 outline-none focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                            />

                            <button
                                type="button"
                                onClick={handleDoctorSearch}
                                className="absolute right-2 top-2 rounded-lg bg-[#0097B2] px-5 py-2 font-medium text-white hover:bg-[#007B91]"
                            >
                                {loadingDoctor
                                    ? "Searching..."
                                    : "Search"}
                            </button>

                        </div>

                        {doctor && (

                            <div className="mt-6 rounded-xl border bg-slate-50 p-5">

                                <h3 className="text-xl font-bold text-slate-800">
                                    Dr. {doctor.userId.name}
                                </h3>

                                <p className="mt-1 text-slate-500">
                                    {doctor.specialization}
                                </p>

                                <div className="mt-4 grid grid-cols-2 gap-4">

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Qualification
                                        </p>

                                        <p className="font-semibold">
                                            {doctor.qualification}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Consultation Fee
                                        </p>

                                        <p className="font-semibold text-[#0097B2]">
                                            ₹ {doctor.consultationFee}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

                {/* Services */}

                <div className="rounded-2xl border bg-white p-8 shadow-sm">

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <h2 className="text-2xl font-bold text-slate-800">
                                Services
                            </h2>

                            <p className="mt-1 text-slate-500">
                                Add all billable services for this invoice.
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={addService}
                            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                            + Add Service
                        </button>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b bg-slate-50">

                                    <th className="px-4 py-4 text-left">
                                        Service
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Qty
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Unit Price
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Total
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {services.map((service, index) => (

                                    <tr
                                        key={index}
                                        className="border-b"
                                    >

                                        <td className="p-3">

                                            <input
                                                type="text"
                                                value={service.serviceName}
                                                onChange={(e) =>
                                                    handleServiceChange(
                                                        index,
                                                        "serviceName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Service Name"
                                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0097B2]"
                                            />

                                        </td>

                                        <td className="p-3">

                                            <input
                                                type="number"
                                                min={1}
                                                value={service.quantity}
                                                onChange={(e) =>
                                                    handleServiceChange(
                                                        index,
                                                        "quantity",
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-full rounded-lg border px-4 py-3 text-center outline-none focus:border-[#0097B2]"
                                            />

                                        </td>

                                        <td className="p-3">

                                            <input
                                                type="number"
                                                min={0}
                                                value={service.unitPrice}
                                                onChange={(e) =>
                                                    handleServiceChange(
                                                        index,
                                                        "unitPrice",
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-full rounded-lg border px-4 py-3 text-center outline-none focus:border-[#0097B2]"
                                            />

                                        </td>

                                        <td className="p-3 text-center font-semibold text-[#0097B2]">

                                            ₹{" "}
                                            {(
                                                service.quantity *
                                                service.unitPrice
                                            ).toLocaleString()}

                                        </td>

                                        <td className="p-3 text-center">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeService(index)
                                                }
                                                className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
                                            >
                                                Remove
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
                                {/* Bottom Section */}

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Payment Method */}

                    <div className="rounded-2xl border bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-2xl font-bold text-slate-800">
                            Payment Method
                        </h2>

                        <label className="mb-2 block text-sm font-medium text-slate-600">
                            Select Payment Method
                        </label>

                        <select
                            value={paymentMethod}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                        >
                            <option value="Cash">
                                Cash
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Card">
                                Card
                            </option>

                            <option value="Net Banking">
                                Net Banking
                            </option>

                        </select>

                        <div className="mt-8 rounded-xl bg-[#0097B2]/5 p-5">

                            <h3 className="font-semibold text-slate-700">
                                Billing Information
                            </h3>

                            <p className="mt-3 text-sm text-slate-500">
                                • GST : 18%
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                • Invoice generated instantly.
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                • Payment status will be Pending by default.
                            </p>

                        </div>

                    </div>

                    {/* Invoice Summary */}

                    <div className="lg:col-span-2 rounded-2xl border bg-white p-8 shadow-sm">

                        <h2 className="mb-8 text-2xl font-bold text-slate-800">
                            Invoice Summary
                        </h2>

                        <div className="space-y-5">

                            <div className="flex items-center justify-between border-b pb-4">

                                <span className="text-slate-600">
                                    Subtotal
                                </span>

                                <span className="text-xl font-semibold">
                                    ₹ {subtotal.toLocaleString()}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b pb-4">

                                <span className="text-slate-600">
                                    GST (18%)
                                </span>

                                <span className="text-xl font-semibold text-orange-600">
                                    ₹ {tax.toFixed(2)}
                                </span>

                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-[#0097B2] px-6 py-6">

                                <span className="text-2xl font-bold text-white">
                                    Total Amount
                                </span>

                                <span className="text-3xl font-bold text-white">
                                    ₹ {total.toFixed(2)}
                                </span>

                            </div>

                        </div>

                        

                    </div>

                </div>
                                {/* Generate Button */}

                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="rounded-xl bg-[#0097B2] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#007B91]"
                    >
                        Generate Invoice
                    </button>

                </div>

            </form>

        </div>

    );

};

export default GenerateInvoice;