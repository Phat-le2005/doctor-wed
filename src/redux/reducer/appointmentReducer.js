import { FERTCH_APPOINTMENT_ERROR,FERTCH_APPOINTMENT_REQUEST,FERTCH_APPOINTMENT_SUCCESS } from "../action/types";
const INITIAL_STATE = {
    listAppointment: [],
    isLoading: false,
    isError: false
}
const appointmentRender = (state =INITIAL_STATE,action)=>{
        switch (action.type) {
            case FERTCH_APPOINTMENT_REQUEST:
                return {
                    ...state, isLoading: true,
                };
    
            case FERTCH_APPOINTMENT_SUCCESS:
                return {
                    ...state, isLoading: false, isError: false, listAppointment: action.payload
                };
    
            case FERTCH_APPOINTMENT_ERROR:
                return {
                    ...state, isLoading: false, isError: true
                };
    
            default: return state;
        }
}
export default {
    appointmentRender
}