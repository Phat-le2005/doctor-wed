import axios from "axios"; // nếu axios đã được config

export const createHosoAPI = (formData) => {
  // Ghép ngày/tháng/năm thành 1 chuỗi ngày sinh
  const dob = `${formData.nam}-${formData.thang}-${formData.ngay}`;
  const sex = formData == "true" ? true : false
  const Id = parseInt(formData.userId)
  const data = {
    name: formData.name,
    phoneNumber: formData.phone,
    email: formData.email,
    id: formData.id,
    day: dob,
    job: formData.job,
    dantoc: formData.dantoc,
    sex: sex, // hoặc lấy từ dropdown nếu bạn bind giới tính
    address: `${formData.address}, ${formData.phuong}, ${formData.quan}, ${formData.tinh}`,
    userId: Id
  };

  return axios.post("/api/create_hoso", data);
};
export const get_Hoso = async(userId)=>{
  if(!userId){
    console.log("thieu userId")
  }
  try {
    const data = await axios.get(`/api/get_hoso/${userId}`);
    return data
  } catch (error) {
    console.error("Error fetching specialty data", error);
  }
}
export const DeleteHoSo = async(HsId) =>{
  try {
    const res = await axios.delete(`/api/delete_hoso/${HsId}`)
    return res.data
  } catch (e) {
    return {
      errCode: 1,
      errMessage: "Lỗi khi gọi API xóa người dùng",
    };
  }
}
export const UpdateHoSo = async(HsId,HsData) => {
  try {
    const response = await axios.put(`/api/update_hoso/${HsId}`, HsData);
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Ném lỗi để xử lý ở component
  }
}