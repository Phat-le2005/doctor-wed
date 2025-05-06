import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateDoctorEmail,UpdateDoctorPass,UpdateDoctorPhone, UpdateDoctorRole } from "../redux/action/doctorAction";
const getDataDoctor = async(doctorId)=>{
    if (!doctorId) {
        console.warn("doctorId not found");
        return ;
    }

    try {

        const response = await axios.get(`/api/find_doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data", error);
        toast.error(error)
        return ;
    }
}

const UpdateEmailDoctor = async (dispatch, doctorId, email) => {
    if (!doctorId) {
      toast.error("Không tìm thấy ID của bác sĩ");
      return;
    }
  
    if (!email) {
      toast.error("Bạn cần nhập email");
      return;
    }
  
    try {
      const res = await axios.put(`/api/update_doctoremail/${doctorId}`, { email });
  
      if (res.data?.errCode === 0) {
        dispatch(updateDoctorEmail(email)); 
        toast.success("Cập nhật email thành công");
      } else {
        toast.error(res.data?.message || "Cập nhật thất bại");
      }
  
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi server khi cập nhật email");
    }
  };

  const UpdatePhoneDoctor = async (dispatch, doctorId, phoneNumber) => {
    if (!doctorId) {
      toast.error("Không tìm thấy ID của bác sĩ");
      return;
    }
  
    if (!phoneNumber) {
      toast.error("Bạn cần nhập So Dien Thoai");
      return;
    }
  
    try {
      const res = await axios.put(`/api/update_doctorphone/${doctorId}`, { phoneNumber });
  
      if (res.data?.errCode === 0) {
        dispatch(UpdateDoctorPhone(phoneNumber)); 
        toast.success("Cập nhật So dien Thoai thành công");
      } else {
        toast.error(res.data?.message || "Cập nhật thất bại");
      }
  
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi server khi cập nhật email");
    }
  };
  const UpdatePassDoctor = async(dispatch,doctorId,oldPass,newPass) =>{
    if (!doctorId) {
      toast.error("Không tìm thấy ID của bác sĩ");
      return;
    }
    if(!oldPass){
      toast.error("Nhap Mat Khau cu")
      return
    }
    if(!newPass){
      toast.error("Nhap Mat Khau Moi")
      return
    }
    try {
      const res = await axios.put(`/api/update_doctorpassword/${doctorId}`, { oldPass,newPass })
      if (res.data?.errCode === 0) {
        dispatch(UpdateDoctorPass(newPass)); 
        toast.success("Cập nhật Pass thành công");
      } else {
        toast.error(res.data?.message || "Cập nhật thất bại");
      }
  
    } catch (error) {
      toast.error(error.response?.data?.message || "Mat Khau sai");
    }
  }
  const createDoctor = (formData) => {
    
    try {
        const data= axios.post("/api/create_doctor", formData);
        return data.data
    } catch (error) {
        return error    
    }
       
      };
      const DeleteDoctor = async(doctorId) =>{
        try {
          const res = await axios.delete(`/api/delete_doctor/${doctorId}`)
          return res.data
        } catch (e) {
          return {
            errCode: 1,
            errMessage: "Lỗi khi gọi API xóa người dùng",
          };
        }
      }
      const UpdateRoleDoctor = async (dispatch, doctorId, role) => {
        if (!doctorId) {
          toast.error("Không tìm thấy ID của bác sĩ");
          return;
        }
      
        try {
          const res = await axios.put(`/api/update_doctorrole/${doctorId}`, { role });
      
          if (res.data?.errCode === 0) {
            toast.success("Cập nhật role thành công");
            dispatch(UpdateDoctorRole({ doctorId, role }));
          } else {
            toast.error(res.data?.message || "Cập nhật thất bại");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Lỗi server khi cập nhật role");
        }
      };
      
export { getDataDoctor,UpdateEmailDoctor,UpdatePhoneDoctor,UpdatePassDoctor,DeleteDoctor,createDoctor,UpdateRoleDoctor}