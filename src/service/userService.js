import axios from "axios"
const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`/api/delete_user/${userId}`);
      return res.data; // Quan trọng! Vì Axios response bao ngoài: { data: { errCode, errMessage } }
    } catch (err) {
      console.error("Lỗi khi gọi API xóa:", err);
      return {
        errCode: 1,
        errMessage: "Lỗi khi gọi API xóa người dùng",
      };
    }
  };
export {
    deleteUser
}