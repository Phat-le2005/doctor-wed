import axios from "axios";
import { toast } from "react-toastify";
const get_specialty = async (page = 1, limit = 10, departmentId, searchKeyword = '') => {
  try {
    const depId = searchKeyword ? 'null' : departmentId; // Nếu có từ khóa, bỏ departmentId
    const response = await axios.get(`/api/get_specialty/${depId}?page=${page}&limit=${limit}&search=${searchKeyword}`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching specialty data", error);
    return [];
  }
};
 const getDoctorsBySpecialty = async ( specialtyId, page , limit ) => {
    try {
      const response = await axios.get(`/api/getallspecialty?page=${page}&limit=${limit}&specialtyId=${specialtyId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi gọi API getDoctorsBySpecialty:', error);
      throw error.response?.data || { errCode: 1, errMessage: 'Lỗi không xác định từ client' };
    }
  };
  const getSpecialtyByDoctor = async (departmentId) =>{
    try {
      const response = await axios.get(`/api/getspecialtydoctor/${departmentId}`)
      return response.data
    } catch (error) {
      console.error('Lỗi khi gọi API getDoctorsBySpecialty:', error);
      throw error.response?.data || { errCode: 1, errMessage: 'Lỗi không xác định từ client' };
    }
  }
  const CreateSpecialty = async (data) => {
    const response = await axios.post('/api/create_specialty',data)
    if(response.data.errCode == 1) {
      toast.error('Error')
    }
    else{
      toast.success("Tao Thanh Cong")
    }
  }
  const DeleteSpecialty = async (specialtyId) =>{
    try {
      const message = await axios.delete(`/api/delete_specialty/${specialtyId}`)
      if(message.data.errCode==0){
        toast.success("Xoa Thanh Cong")
      }
      else {
        toast.error("Xoa That Bai")
      }
    } catch (error) {
      toast.error(error)
    }
   
  }
  const getDoctor = async(keyword) => {
    try {
        if (!keyword.trim()) return [];
        const response = await axios.get(`/api/getdoctorkeyword?search=${keyword}`);
       
        if (response.data.errCode === 0) {
            return response.data.data|| []; // đảm bảo là mảng
        }
        return [];
    } catch (error) {
        console.error("Lỗi gọi API thuốc:", error);
        return [];
    }
}
const DeleteDS = async (specialtyId) => {
  try {
      if(!specialtyId){
          toast.error("Khong thay input")
      }
      await axios.delete(`/api/delete_ds/${specialtyId}`)
  } catch (error) {
      return [];  
  }
}
const CreateDS = async(doctorId,specialtyId)=>{
  try {
    if(!doctorId){
      toast.error("Khong input")
    }
    if(!specialtyId){
      toast.error("Khong input")
    }
    const dataaa = {
     doctorId: doctorId,
     specialtyId: specialtyId
    }
    const response = await axios.post(`/api/create_ds`,dataaa)
    if(response.data.errCode ===0 ){
      toast.success(response.data.errMessage)
    }
  } catch (error) {
    console.error('Lỗi khi gọi CreateHP', error);
    throw error.response?.data || { message: 'Lỗi không xác định' };
  }
}
const UpdateSpecialty = async (specialtyId,specialtyName,specialtyDescription,specialtyImage) =>{
  try {
    if(!specialtyName){
      toast.error("Vui Long Nhap Ten")
    }
    if(!specialtyDescription){
      toast.error("Vui Long Nhap Trieu Chung")
    }
    if(!specialtyImage){
      toast.error("Vui Long Nhap Hinh Anh")
    }
    
    const data = {
      specialtyName: specialtyName,
      specialtyDescription: specialtyDescription,
      specialtyImage: specialtyImage
    }
    const response = await axios.put(`/api/update_specialty/${specialtyId}`,data)
    if(response.data.errCode ===0 ){
      toast.success(response.data.errMessage)
    }
  } catch (error) {
    console.error('Lỗi khi gọi UpdateSpecialty:', error);
  throw error.response?.data || { message: 'Lỗi không xác định' };
  }
}
export {
    get_specialty,getDoctorsBySpecialty,getSpecialtyByDoctor,CreateSpecialty,DeleteSpecialty,
    getDoctor,DeleteDS,CreateDS,UpdateSpecialty
};