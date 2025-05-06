import axios from "axios";
const getAllRoom = async (page,limit) =>{
    let response = await axios.get(`/api/get_all_room?page=${page}&limit=${limit}`)
    return response
}
const createRoom = (formData) => {
    
    try {
        const data= axios.post("/api/create_room", formData);
        return data.data
    } catch (error) {
        return error    
    }
       
      };
const DeleteRoom = async(roomId) =>{
        try {
          const res = await axios.delete(`/api/delete_room/${roomId}`)
          return res.data
        } catch (e) {
          return {
            errCode: 1,
            errMessage: "Lỗi khi gọi API xóa người dùng",
          };
        }
      }
const UpdateRoom = async(roomId,roomData) => {
        try {
          const response = await axios.put(`/api/update_room/${roomId}`, roomData);
          return response.data; // Trả về dữ liệu phản hồi từ server
        } catch (error) {
          console.error('Error updating user:', error);
          throw error; // Ném lỗi để xử lý ở component
        }
      }
export {
    getAllRoom,createRoom,DeleteRoom,UpdateRoom
}