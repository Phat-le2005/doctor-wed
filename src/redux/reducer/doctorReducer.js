import {  GET_ALL_DOCTOR_ERROR,GET_ALL_DOCTOR_REQUEST,GET_ALL_DOCTOR_SUCCESS } from "../action/types";
const initialState = {
    listDoctor: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,listSpecialty:[]
  };
const doctorRenderPaginate = (state = initialState, action)=>{
    switch(action.type){
        case GET_ALL_DOCTOR_REQUEST:
            return{
                ...state,isLoading: true,
            }
        case GET_ALL_DOCTOR_SUCCESS:
            return{
                ...state,isLoading: false,listDoctor: action.payload.data,totalPages: action.payload.totalPages,page: action.payload.page
            }
        case GET_ALL_DOCTOR_ERROR:
            return{
                ...state,isLoading:false
            }
            default:
                return state; 
            
    }
}
export default doctorRenderPaginate;