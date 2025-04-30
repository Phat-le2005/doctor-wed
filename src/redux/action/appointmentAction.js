import axios from "axios"
import { toast } from "react-toastify"
import { FERTCH_APPOINTMENT_ERROR,FERTCH_APPOINTMENT_REQUEST,FERTCH_APPOINTMENT_SUCCESS } from "./types"

export const fertchAppointmentRequest = () =>{
    return{
        type: FERTCH_APPOINTMENT_REQUEST
    }
}
export const fertchAppointmentSuccess = (listAppointment) =>{
    return{
        type: FERTCH_APPOINTMENT_SUCCESS,
        payload: listAppointment
    }
}
export const fertchAppointmentError = () =>{
    return{
        type: FERTCH_APPOINTMENT_ERROR
    }
}
export const getAllAppointment = (doctorId, page, limit, status ) => {
    return async (dispatch, getState) => {
      dispatch(fertchAppointmentRequest());
      try {
        const res = await axios.get(`/api/get_appointment/${doctorId}?page=${page}&limit=${limit}&status=${status}`);
        if (!res.data) {
          dispatch(fertchAppointmentError());
          return null;
        } else {
          dispatch(fertchAppointmentSuccess(res.data.data));
          return res.data.data;
        }
      } catch (e) {
        dispatch(fertchAppointmentError());
        return null;
      }
    };
  };