import axios from "axios"
import { FERTH_DEPARTMENT_ERROR,FERTH_DEPARTMENT_SUCCESS,FERTH_DEPARTMENT_REQUEST } from "./types"

export const fertchDepartmentRequest = () =>{
    return {
        type: FERTH_DEPARTMENT_REQUEST,
    }
}
export const fertchDepartmentSuccess = (listDepartment) =>{
    return {
        type: FERTH_DEPARTMENT_SUCCESS,
        payload: listDepartment
    }
}
export const fertchDepartmentError = () =>{
    return {
        type: FERTH_DEPARTMENT_ERROR,
    }
}
export const getAllDepartment = () => {
    return async (dispatch, getState) => {
      dispatch(fertchDepartmentRequest());
      try {
        const res = await axios.get(`/api/get-all-department`);
        if (!res.data || res.data.errCode !== 0) {
          dispatch(fertchDepartmentError());
          return null;
        } else {
          dispatch(fertchDepartmentSuccess(res.data.data)); // Truyền mảng data
          return res.data.data;
        }
      } catch (error) {
        dispatch(fertchDepartmentError());
        return null;
      }
    };
  };