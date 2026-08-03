import api from "./api";

export const bookAppointment = async (appointmentData) => {
    const { data } = await api.post(
        "/appointments",
        appointmentData
    );

    return data;
};

export const getAllAppointments = async () => {
    const { data } = await api.get("/appointments");
    return data;
};

export const cancelAppointment = async (appointmentId) => {
    const { data } = await api.patch(
        `/appointments/${appointmentId}/cancel`
    );

    return data;
};

