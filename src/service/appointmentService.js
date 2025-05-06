import axios from "axios";
import { toast } from "react-toastify";
import { CreateHistory } from "./historyService";
export const createAppointment = (fromData) =>{
    const data ={
        userId: fromData.userId,
        scheduleId: fromData.scheduleId,
        hoSoId: fromData.hoSoId,
        day: fromData.day
    }
    return axios.post("/api/create_appointment",data);
}
export const AcceptAppointment = async (appointmentId, doctorId, status) => {
  if (!appointmentId) {
    throw new Error("Không nhận được Appointment ID");
  }
  if (!doctorId) {
    throw new Error("Không nhận được Doctor ID");
  }
  if (!status) {
    throw new Error("Không nhận được trạng thái");
  }

  try {
    // Gọi CreateHistory chỉ nếu status là "completed"
    console.log(appointmentId,doctorId)
    if (status === "completed") {
      await CreateHistory(appointmentId, doctorId);
    }

    const response = await axios.put(`/api/accept_appointment/${appointmentId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật lịch hẹn:", error);
    throw new Error("Không thể cập nhật lịch hẹn. Vui lòng thử lại.");
  }
};