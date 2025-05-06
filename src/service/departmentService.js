import axios from "axios";
export const createDepartment = (formData) => {
    
try {
    const data= axios.post("/api/create_department", formData);
    return data.data
} catch (error) {
    return error    
}
   
  };
  export const DeleteDepartment = async(departmentId) =>{
    try {
      const res = await axios.delete(`/api/delete_department/${departmentId}`)
      return res.data
    } catch (e) {
      return {
        errCode: 1,
        errMessage: "Lỗi khi gọi API xóa người dùng",
      };
    }
  }
  export const UpdateDepartment = async(departmentId,departmentData) => {
    try {
      const response = await axios.put(`/api/update_department/${departmentId}`, departmentData);
      return response.data; // Trả về dữ liệu phản hồi từ server
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; // Ném lỗi để xử lý ở component
    }
  }