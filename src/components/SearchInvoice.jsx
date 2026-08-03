import React, { useState } from "react";
import { Search, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchInvoice } from "../services/invoiceService";

const SearchInvoice = () => {

    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const [invoices, setInvoices] = useState([]);

    const [error, setError] = useState("");

    const handleSearch = async (e) => {

        e.preventDefault();

        if (!query.trim()) {

            setError("Please enter patient name.");

            setInvoices([]);

            return;

        }

        try {

            setLoading(true);

            setError("");

            const response = await searchInvoice(query);

            if (response.count === 0) {

                setInvoices([]);

                setError("No invoices found.");

            } else {

                setInvoices(response.invoices);

            }

        } catch (error) {

            setInvoices([]);

            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Search Invoice
                </h1>

                <p className="mt-2 text-slate-500">
                    Search invoices using patient name.
                </p>

            </div>

            {/* Search Card */}

            <div className="rounded-2xl border bg-white p-8 shadow-sm">

                <form
                    onSubmit={handleSearch}
                    className="flex gap-4"
                >

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Enter patient name..."
                            value={query}
                            onChange={(e) =>
                                setQuery(e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/20"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-[#0097B2] px-8 font-semibold text-white transition hover:bg-[#007B91]"
                    >
                        {loading
                            ? "Searching..."
                            : "Search"}
                    </button>

                </form>

                {error && (

                    <p className="mt-5 text-red-500">
                        {error}
                    </p>

                )}

                {invoices.length > 0 && (

                    <div className="mt-8 space-y-6">
                                                {invoices.map((invoice) => (

                            <div
                                key={invoice._id}
                                className="rounded-2xl border border-gray-200 bg-slate-50 p-6 transition hover:shadow-md"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">

                                        <div className="rounded-full bg-[#0097B2]/10 p-4">

                                            <Receipt
                                                size={28}
                                                className="text-[#0097B2]"
                                            />

                                        </div>

                                        <div>

                                            <h2 className="text-2xl font-bold text-slate-800">
                                                Invoice #{invoice.invoiceNumber}
                                            </h2>

                                            <p className="mt-1 text-slate-500">
                                                Patient :{" "}
                                                {invoice.patient.userId.name}
                                            </p>

                                        </div>

                                    </div>

                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                            invoice.paymentStatus === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : invoice.paymentStatus === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {invoice.paymentStatus}
                                    </span>

                                </div>

                                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

                                    <div>

                                        <p className="text-sm font-medium text-slate-500">
                                            Doctor
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-slate-800">
                                            {" "}
                                            {invoice.doctor.userId.name}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-slate-500">
                                            Total Amount
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-[#0097B2]">
                                            ₹{" "}
                                            {invoice.totalAmount.toLocaleString()}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-slate-500">
                                            Payment Method
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-slate-800">
                                            {invoice.paymentMethod}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-slate-500">
                                            Invoice Date
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-slate-800">
                                            {new Date(
                                                invoice.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-8 flex justify-end">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/receptionist/invoices/${invoice.invoiceNumber}`
                                            )
                                        }
                                        className="rounded-xl bg-[#0097B2] px-8 py-3 font-semibold text-white transition hover:bg-[#007B91]"
                                    >
                                        View Invoice
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

};

export default SearchInvoice;