import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getInvoiceByNumber,
    updatePaymentStatus,
} from "../services/invoiceService";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
const ViewInvoice = () => {

    const invoiceRef = useRef(null);
    const { invoiceNumber } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(null);

    const [loading, setLoading] = useState(true);
    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        documentTitle: `Invoice-${invoiceNumber}`,
    });
    const handleMarkAsPaid = async () => {
    try {

        await updatePaymentStatus(
            invoice.invoiceNumber,
            "Paid"
        );

        const response = await getInvoiceByNumber(
            invoice.invoiceNumber
        );

        setInvoice(response.invoice);

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Failed to update payment status."
        );

    }
};

    useEffect(() => {

        const fetchInvoice = async () => {

            try {

                const response = await getInvoiceByNumber(
                    invoiceNumber
                );

                setInvoice(response.invoice);

            } catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.message ||
                    "Failed to load invoice."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchInvoice();

    }, [invoiceNumber]);


    if (loading) {

        return (

            <div className="flex h-screen items-center justify-center">

                <h2 className="text-2xl font-semibold text-slate-600">
                    Loading Invoice...
                </h2>

            </div>

        );

    }

    if (!invoice) return null;
    // const navigate = useNavigate();

    


    return (

        <div className="bg-slate-100 p-10">

            <div ref={invoiceRef} className="mx-auto max-w-5xl rounded-lg bg-white p-10 shadow-lg">

                {/* Header */}

                <div className="flex items-start justify-between border-b pb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-[#16324F]">
                            MediFlow Hospital
                        </h1>

                        <p className="mt-2 text-slate-600">
                            12 Hospital Road,
                            Nagpur, Maharashtra
                        </p>

                        <p className="text-slate-600">
                            +91 9876543210
                        </p>

                        <p className="text-slate-600">
                            www.mediflowhospital.com
                        </p>

                    </div>

                    <div className="text-right">



                        <h2 className="mt-4 text-4xl font-bold tracking-wide text-slate-800">
                            INVOICE
                        </h2>

                    </div>

                </div>
                {/* Patient + Invoice Details */}

                <div className="mt-8 grid grid-cols-2 gap-10">

                    {/* Patient Details */}

                    <div className="rounded-md border border-slate-400">

                        <table className="w-full border-collapse">

                            <tbody>

                                <tr>
                                    <td className="w-44 border border-slate-400 bg-slate-100 px-3 py-2 font-semibold">
                                        Patient Name
                                    </td>

                                    <td className="border border-slate-400 px-3 py-2">
                                        {invoice.patient.userId.name}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-400 bg-slate-100 px-3 py-2 font-semibold">
                                        Phone
                                    </td>

                                    <td className="border border-slate-400 px-3 py-2">
                                        {invoice.patient.phone}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-400 bg-slate-100 px-3 py-2 font-semibold">
                                        Doctor
                                    </td>

                                    <td className="border border-slate-400 px-3 py-2">
                                        {invoice.doctor.userId.name}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-400 bg-slate-100 px-3 py-2 font-semibold">
                                        Payment
                                    </td>

                                    <td className="border border-slate-400 px-3 py-2">
                                        {invoice.paymentMethod}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-400 bg-slate-100 px-3 py-2 font-semibold">
                                        Status
                                    </td>

                                    <td className="border border-slate-400 px-3 py-2">
                                        {invoice.paymentStatus}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                    {/* Invoice Details */}

                    <div className="flex justify-end">

                        <table className="w-80 border-collapse">

                            <tbody>

                                <tr>

                                    <td className="px-3 py-2 font-semibold">
                                        Invoice No.
                                    </td>

                                    <td className="px-3 py-2 text-right">
                                        #{invoice.invoiceNumber}
                                    </td>

                                </tr>

                                <tr>

                                    <td className="px-3 py-2 font-semibold">
                                        Date
                                    </td>

                                    <td className="px-3 py-2 text-right">
                                        {new Date(
                                            invoice.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                </tr>

                                <tr>

                                    <td className="px-3 py-2 font-semibold">
                                        GST
                                    </td>

                                    <td className="px-3 py-2 text-right">
                                        18%
                                    </td>

                                </tr>

                                <tr>

                                    <td className="px-3 py-2 font-semibold">
                                        Due Amount
                                    </td>

                                    <td className="px-3 py-2 text-right font-bold text-red-600">
                                        ₹ {invoice.totalAmount.toFixed(2)}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Services Table */}

                <div className="mt-10 overflow-hidden rounded-md border border-slate-400">

                    <table className="w-full border-collapse">

                        <thead className="bg-slate-100">
                            <tr>
                                <th className="border border-slate-400 px-3 py-3">
                                    SR#
                                </th>

                                <th className="border border-slate-400 px-3 py-3">
                                    Description
                                </th>

                                <th className="border border-slate-400 px-3 py-3">
                                    Qty
                                </th>

                                <th className="border border-slate-400 px-3 py-3">
                                    Price
                                </th>

                                <th className="border border-slate-400 px-3 py-3">
                                    Amount
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoice.services.map((service, index) => (

                                <tr key={index}>

                                    <td className="border border-slate-400 px-3 py-3 text-center">
                                        {index + 1}
                                    </td>

                                    <td className="border border-slate-400 px-3 py-3">
                                        {service.serviceName}
                                    </td>

                                    <td className="border border-slate-400 px-3 py-3 text-center">
                                        {service.quantity}
                                    </td>

                                    <td className="border border-slate-400 px-3 py-3 text-right">
                                        ₹ {service.unitPrice.toFixed(2)}
                                    </td>

                                    <td className="border border-slate-400 px-3 py-3 text-right">
                                        ₹ {service.totalPrice.toFixed(2)}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Bottom Section */}

                <div className="mt-8 grid grid-cols-2 gap-10">

                    {/* Terms */}

                    <div className="rounded-md border border-slate-400 p-5">

                        <h3 className="mb-3 text-lg font-bold text-slate-800">
                            Terms & Conditions
                        </h3>

                        <ul className="space-y-2 text-sm text-slate-600">

                            <li>
                                • Payment should be completed before discharge.
                            </li>

                            <li>
                                • Invoice once generated cannot be modified.
                            </li>

                            <li>
                                • Please preserve this invoice for future reference.
                            </li>

                            <li>
                                • Thank you for choosing MediFlow Hospital.
                            </li>

                        </ul>

                    </div>

                    {/* Amount Summary */}

                    <div className="rounded-md border border-slate-400">

                        <table className="w-full border-collapse">

                            <tbody>

                                <tr>

                                    <td className="border border-slate-400 px-4 py-3 font-semibold">
                                        Sub Total
                                    </td>

                                    <td className="border border-slate-400 px-4 py-3 text-right">
                                        ₹ {invoice.subtotal.toFixed(2)}
                                    </td>

                                </tr>

                                <tr>

                                    <td className="border border-slate-400 px-4 py-3 font-semibold">
                                        GST (18%)
                                    </td>

                                    <td className="border border-slate-400 px-4 py-3 text-right">
                                        ₹ {invoice.tax.toFixed(2)}
                                    </td>

                                </tr>

                                <tr className="bg-slate-100">

                                    <td className="border border-slate-400 px-4 py-4 text-lg font-bold">
                                        Total Amount
                                    </td>

                                    <td className="border border-slate-400 px-4 py-4 text-right text-xl font-bold text-[#16324F]">
                                        ₹ {invoice.totalAmount.toFixed(2)}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>
                {/* Amount In Words */}



                {/* Signature */}

                <div className="mt-16 flex justify-end">

                    <div className="text-center">

                        <div className="mx-auto w-56 border-b border-slate-500"></div>

                        <p className="mt-3 font-semibold text-slate-700">
                            Authorized Signature
                        </p>

                        <p className="text-sm text-slate-500">
                            Reception Desk
                        </p>

                        <p className="text-sm text-slate-500">
                            MediFlow Hospital
                        </p>

                    </div>

                </div>

                {/* Footer */}

                <div className="mt-12 border-t pt-6 text-center">

                    <h3 className="text-lg font-bold text-[#16324F]">
                        Thank You For Choosing MediFlow Hospital
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        12 Hospital Road, Nagpur, Maharashtra
                    </p>

                    <p className="text-sm text-slate-500">
                        Phone : +91 9876543210
                    </p>

                    <p className="text-sm text-slate-500">
                        Email : support@mediflowhospital.com
                    </p>

                    <p className="text-sm text-slate-500">
                        www.mediflowhospital.com
                    </p>

                </div>

                {/* Buttons */}

                <div className="mt-10 flex justify-end gap-4">

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Back
                    </button>

                    {invoice.paymentStatus === "Pending" ? (
                        <button
                            onClick={handleMarkAsPaid}
                            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                        >
                            Mark as Paid
                        </button>
                    ) : (
                        <button
                            onClick={handlePrint}
                            className="rounded-lg bg-[#0097B2] px-6 py-3 font-semibold text-white hover:bg-[#007B91]"
                        >
                            Print Invoice
                        </button>
                    )}

                </div>

            </div>

        </div>

    );

};

export default ViewInvoice;