import api from "./api";

export const getReceptionistDashboard = async () => {
    const { data } = await api.get("/receptionist/dashboard");
    return data;
};