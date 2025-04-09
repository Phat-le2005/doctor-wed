import axios from "axios"
import { GET_ALL_DOCTOR_ERROR,GET_ALL_DOCTOR_SUCCESS,GET_ALL_DOCTOR_REQUEST } from "./types"

export const getAllDoctorSuccess = (ListDoctor)=>{
    return {
        type: GET_ALL_DOCTOR_SUCCESS,
        payload: ListDoctor
    }
}
export const getAllDoctorRequest = ()=>{
    return {
        type: GET_ALL_DOCTOR_REQUEST,
    }
}
export const getAllDoctorError = ()=>{
    return {
        type: GET_ALL_DOCTOR_ERROR,
    }
}
export const getAllDoctorPaginate=(pageNumber,limitNumber)=>{
    return async (dispatch,getState) =>{
        dispatch(getAllDoctorRequest());
         try {
            let res = await axios.get(`http://localhost:8082/api/get_doctor?page=${pageNumber}&limit=${limitNumber}`)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(getAllDoctorSuccess({  data: res.data.data,
                    page: res.data.page,
                    totalPages: res.data.totalPages}));
                return res.data; // thêm return để component nhận dữ liệu!
              } else {
                dispatch(getAllDoctorError());
                return res.data;
              }
         } catch (error) {
            dispatch(getAllDoctorError())
         }
    }
}