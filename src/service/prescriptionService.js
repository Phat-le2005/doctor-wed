import axios from "axios";
import { toast } from "react-toastify";
const getPrescription = async(keyword) => {
    try {
        if (!keyword.trim()) return [];
        const response = await axios.get(`/api/get_prescription?search=${keyword}`);
       
        if (response.data.errCode === 0) {
            return response.data.data|| []; // đảm bảo là mảng
        }
        return [];
    } catch (error) {
        console.error("Lỗi gọi API thuốc:", error);
        return [];
    }
}
const getPrescriptionHistory = async (historyId)=>{
    try {
        if(!historyId){
            toast.error("Khong thay input")
        }
        const data = await axios.get(`/api/get_prescription_history/${historyId}`)
        if(data.data.errCode === 1 ){
            toast.error("Du lieu Rong")
        }
        console.log(data.data.data)
        return data.data.data[0].Prescriptions
    } catch (error) {
        console.error("Lỗi gọi API thuốc:", error);
        return [];   
    }
}
const DeletePrescription = async (historyId) => {
    try {
        if(!historyId){
            toast.error("Khong thay input")
        }
        await axios.delete(`/api/delete_prescription/${historyId}`)
    } catch (error) {
        return [];  
    }
}
export {
    getPrescription,getPrescriptionHistory,DeletePrescription
}