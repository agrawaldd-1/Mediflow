import api from "./api";

export const generateInvoice = async (invoiceData) => {
    const { data } = await api.post(
        "/invoice",
        invoiceData
    );

    return data;
};



export const viewInvoice = async (invoiceNumber) => {
    const { data } = await api.get(
        `/invoice/${invoiceNumber}`
    );

    return data;
};

export const searchInvoice = async (query) => {

    const { data } = await api.get(
        "/invoice/search",
        {
            params: {
                query,
            },
        }
    );

    return data;

};
export const getInvoiceByNumber = async (invoiceNumber) => {

    const { data } = await api.get(
        `/invoice/${invoiceNumber}`
    );

    return data;

};

export const updatePaymentStatus = async (
    invoiceNumber,
    paymentStatus
) => {

    const { data } = await api.patch(
        `/invoice/${invoiceNumber}/payment-status`,
        {
            paymentStatus,
        }
    );

    return data;
};