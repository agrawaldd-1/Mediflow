import api from "./api";

export const getTodaysAppointment = async()=>{
    const {data} = await api.get("appointments/today")
    return data;
}