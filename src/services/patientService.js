import api from "./api";

export const getMedicalHistory =async()=>{
    const {data} = await api.get("patients/medicalHistory");
    return data;
}

export const getUpcomingAppointment = async()=>{
    const {data} = await api.get("appointments/upcoming")
    return data;
}