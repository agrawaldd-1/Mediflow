import api from "./api";

export const getReceptionistDashboard = async () => {
    const { data } = await api.get("/receptionist/dashboard");
    return data;
};



export const registerReceptionist = async (receptionistData) => {
    const { data } = await api.post(
        "/receptionist/register",
        receptionistData
    );

    return data;
};

export const searchReceptionist = async (query) => {
    const { data } = await api.get(
        "/receptionist/search",
        {
            params: {
                name : query,
            },
        }
    );

    return data;
};

export const updateReceptionistStatus = async (
    receptionistId,
    isActive
) => {
    const { data } = await api.patch(
        `/receptionist/${receptionistId}/status`,
        {
            isActive,
        }
    );

    return data;
};

export const getReceptionistById = async (receptionistId) => {
    const { data } = await api.get(
        `/receptionist/${receptionistId}`
    );

    return data;
};

export const updateReceptionist = async (
    receptionistId,
    receptionistData
) => {
    const { data } = await api.put(
        `/receptionist/${receptionistId}`,
        receptionistData
    );

    return data;
};