import axios from "axios"; 
import { toast } from "react-toastify";
export const CreateHistory = async (appointmentId, doctorId) => {
    return axios.post(`/api/create_history`, { appointmentId, doctorId });
  };
  export const GetHistory = async (doctorId,page = 1, limit = 10, historyId = 0 ) => {
    try {
      const response = await axios.get(`/api/get_history/${doctorId}?page=${page}&limit=${limit}&historyId=${historyId}`);
  
      return response.data;
    } catch (error) {
      console.error('Lỗi khi gọi GetHistory:', error);
      throw error.response?.data || { message: 'Lỗi không xác định' };
    }
  };
  export const UpdateHistory = async (historyId,diagnosis,doctorNotes) => {
      try {
        if(!diagnosis){
          toast.error("Vui Long Nhap chuan doan")
        }
        if(!doctorNotes){
          toast.error("Vui Long Nhap Loi Khuyen")
        }
        const data = {
          diagnosis: diagnosis,
          doctorNotes: doctorNotes
        }
        const response = await axios.put(`/api/update_history/${historyId}`,data)
        if(response.data.errCode ===0 ){
          toast.success(response.data.errMessage)
        }
      } catch (error) {
        console.error('Lỗi khi gọi UpdateHistory:', error);
      throw error.response?.data || { message: 'Lỗi không xác định' };
      }
  }
  export const CreateHP = async(historyId,prescriptionId)=>{
    try {
      if(!historyId){
        toast.error("Khong input")
      }
      if(!prescriptionId){
        toast.error("Khong input")
      }
      const dataaa = {
        historyId: historyId,
        prescriptionId: prescriptionId
      }
      const response = await axios.post(`/api/create_hp`,dataaa)
      if(response.data.errCode ===0 ){
        toast.success(response.data.errMessage)
      }
    } catch (error) {
      console.error('Lỗi khi gọi CreateHP', error);
      throw error.response?.data || { message: 'Lỗi không xác định' };
    }
  }