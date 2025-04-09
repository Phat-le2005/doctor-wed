import axios from "axios";
const get_specialty = async (page = 1, limit = 10, departmentId) => {
    if (!departmentId) {
        console.warn("departmentId is required!");
        return [];
    }

    try {

        const response = await axios.get(`/api/get_specialty/${departmentId}?page=${page}&limit=${limit}`);

        return response.data.data || [];
    } catch (error) {
        console.error("Error fetching specialty data", error);
        return [];
    }
};
export {
    get_specialty
};