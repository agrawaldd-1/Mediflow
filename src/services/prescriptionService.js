import api from "./api";

export const createPrescription = async (prescriptionData) => {

    const { data } = await api.post(
        "/prescription",
        prescriptionData
    );

    return data;

};

export const viewPrescription = async (appointmentId) => {

    const { data } = await api.get(
        `/prescription/${appointmentId}`
    );

    return data;

};