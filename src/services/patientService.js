import api from "./api";

export const getMedicalHistory =async()=>{
    const {data} = await api.get("patients/medicalHistory");
    return data;
}

export const getUpcomingAppointment = async()=>{
    const {data} = await api.get("appointments/upcoming")
    return data;
}

export const registerPatient = async (patientData) => {
    const { data } = await api.post(
        "/patients",
        patientData
    );

    return data;
};

export const getAllPatients = async () => {
    const { data } = await api.get("/patients");
    return data;
};

export const updatePatientStatus = async (patientId, isActive) => {
    const { data } = await api.patch(
        `/patients/${patientId}/status`,
        { isActive }
    );

    return data;
};
export const getPatientById = async (patientId) => {
    const { data } = await api.get(
        `/patients/${patientId}`
    );

    return data;
};

export const updatePatientProfile = async (
    patientId,
    patientData
) => {
    const { data } = await api.put(
        `/patients/${patientId}`,
        patientData
    );

    return data;
};

export const searchPatient = async (query) => {
    const { data } = await api.get(
        "/patients/search",
        {
            params: {
                query,
            },
        }
    );

    return data;
};