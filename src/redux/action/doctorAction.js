import axios from "axios"
import { GET_ALL_DOCTOR_ERROR,GET_ALL_DOCTOR_SUCCESS,GET_ALL_DOCTOR_REQUEST,FERTCH_DOCTOR_ERROR,FERTCH_DOCTOR_REQUEST,FERTCH_DOCTOR_LOGOUT,FERTCH_DOCTOR_SUCCESS,UPDATE_DOCTOR_EMAIL, UPDATE_DOCTOR_PHONE,UPDATE_DOCTOR_PASS } from "./types"
import { toast } from "react-toastify"
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
export const fertchDoctorError = () =>{
    return{
        type: FERTCH_DOCTOR_ERROR
    }
}
export const fertchDoctorRequest = () =>{
    return {
        type: FERTCH_DOCTOR_REQUEST
    }
}
export const fertchDoctorSuccess = (doctorData) =>{
    return {
        type: FERTCH_DOCTOR_SUCCESS,
        payload: doctorData
    }
}
export const logoutDoctor = () =>{
    return{
        type: FERTCH_DOCTOR_LOGOUT
    }
}
export const updateDoctorEmail = (newEmail) => {
    return {
      type: UPDATE_DOCTOR_EMAIL,
      payload: newEmail,
    };
  };
  export const UpdateDoctorPhone = (newPhone) => {
    return {
      type: UPDATE_DOCTOR_PHONE,
      payload: newPhone,
    };
  };
  export const UpdateDoctorPass = (newPass) =>{
    return {
      type: UPDATE_DOCTOR_PASS,
      payload: newPass
    }
  }
export const DoctorLogin = (email,password) => {
    return async (dispatch) => {
      dispatch(fertchDoctorRequest());
  
      try {
        const res = await axios.post("http://localhost:8082/api/login_doctor",{email,password}, {
          withCredentials: true // 👈 QUAN TRỌNG: gửi cookie
        });
        if (res?.data?.user) {
            dispatch(fertchDoctorSuccess(res.data));
            toast.success(res.data.message)
          }else {
          dispatch(fertchDoctorError());
          toast.error("Đăng Nhập Thất Bại")
          return { success: false };
        }
      } catch (e) {
        dispatch(fertchDoctorError());
        toast.error("Đăng Nhập Thất Bại")
        return { success: false };
      }
    };
  };