import axios from "axios";
const get_schedule = async(doctorId,specialtyId) =>{
    if (!doctorId || !specialtyId) {
        console.error("❌ get_schedule thiếu dữ liệu", { doctorId, specialtyId });
        throw new Error("No Input");
      }
    
    try {
        const response = await axios.get(`/api/get_schedule?doctorId=${doctorId}&specialtyId=${specialtyId}`);
        return response.data
    } catch (e) {
        console.error("Error fetching specialty data", e);
        
    }
}
export { get_schedule}