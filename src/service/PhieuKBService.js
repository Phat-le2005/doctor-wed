import axios from "axios";

const getPKB =async (userId) =>{
    if (!userId) {
        console.error("❌  thiếu dữ liệu", { userId });
        throw new Error("No Input");
      }
    try {
        const response = await axios.get(`/api/get_PhieuKB/${userId}`)
        console.log(userId)
        return response.data
    } catch (e) {
        console.error("Error fetching specialty data", e);
        
    }
}
export{
    getPKB
}