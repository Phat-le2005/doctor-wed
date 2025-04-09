import axios from "axios";
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
        return ;
    }
}
export { getDataDoctor}