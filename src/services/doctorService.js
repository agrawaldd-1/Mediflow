import api from "./api";

export const getTodaysAppointment = async()=>{
    const {data} = await api.get("appointments/today")
    return data;
}

export const registerDoctor = async (doctorData) => {
    const { data } = await api.post("/doctors/", doctorData);
    return data;
};

export const searchDoctor = async (query) => {
    const { data } = await api.get("doctors/search", {
        params: {
            query,
        },
    });

    return data;
};

export const updateDoctorProfile = async (doctorId, doctorData) => {
    const { data } = await api.put(
        `/doctors/${doctorId}`,
        doctorData
    );

    return data;
};

export const getDoctorById = async (doctorId) => {
    const { data } = await api.get(`/doctors/${doctorId}`);
    return data;
};

export const updateDoctorStatus = async (doctorId, isActive) => {
    const { data } = await api.patch(
        `/doctors/${doctorId}/status`,
        {
            isActive,
        }
    );

    return data;
};

export const getAllDoctors = async () => {
    const { data } = await api.get("/doctors");
    return data;
};

export const getDoctorAvailability = async (doctorId, date) => {
    const { data } = await api.get(
        `/appointments/doctor/${doctorId}/availability?date=${date}`
    );

    return data;
};