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
 const getDoctorsBySpecialty = async ( specialtyId, page , limit ) => {
    try {
      const response = await axios.get(`/api/getallspecialty?page=${page}&limit=${limit}&specialtyId=${specialtyId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi gọi API getDoctorsBySpecialty:', error);
      throw error.response?.data || { errCode: 1, errMessage: 'Lỗi không xác định từ client' };
    }
  };
export {
    get_specialty,getDoctorsBySpecialty
};