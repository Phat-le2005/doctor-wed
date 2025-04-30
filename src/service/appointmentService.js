import axios from "axios";
import { toast } from "react-toastify";
export const createAppointment = (fromData) =>{
    const data ={
        userId: fromData.userId,
        scheduleId: fromData.scheduleId,
        hoSoId: fromData.hoSoId,
        day: fromData.day
    }
    return axios.post("/api/create_appointment",data);
}
export const AcceptAppointment = async (appointmentId, status) => {
    if (!appointmentId) {
      throw new Error("Không nhận được Appointment ID");
    }
    if (!status) {
      throw new Error("Không nhận được trạng thái");
    }
  
    return await axios.put(`/api/accept_appointment/${appointmentId}`, { status });
  };