import {  GET_ALL_DOCTOR_ERROR,GET_ALL_DOCTOR_REQUEST,GET_ALL_DOCTOR_SUCCESS,FERTCH_DOCTOR_ERROR,FERTCH_DOCTOR_LOGOUT,FERTCH_DOCTOR_REQUEST,FERTCH_DOCTOR_SUCCESS,UPDATE_DOCTOR_EMAIL, UPDATE_DOCTOR_PHONE,UPDATE_DOCTOR_PASS, UPDATE_DOCTOR_ROLE } from "../action/types";
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
const initialStateee = {
    isLoading: false,
    isError: false,
    doctorInfo: null,
  };
  
  const doctorLoginReducer = (state = initialStateee, action) => {
    switch (action.type) {
      case FERTCH_DOCTOR_REQUEST:
        return { ...state, isLoading: true, isError: false };
  
      case FERTCH_DOCTOR_SUCCESS:
        return {
          ...state,
          isLoading: false,
          doctorInfo: action.payload,
          isError: false,
        };
  
      case FERTCH_DOCTOR_ERROR:
        return { ...state, isLoading: false, isError: true };
  
      case FERTCH_DOCTOR_LOGOUT:
        return { ...state, doctorInfo: null };
      
    case UPDATE_DOCTOR_EMAIL:
      return {
        ...state,
        doctorInfo: {
          ...state.doctorInfo,
          user: {
            ...state.doctorInfo.user,
            email: action.payload,
          },
        },
      };
      case UPDATE_DOCTOR_PHONE:
        return {
          ...state,
          doctorInfo: {
            ...state.doctorInfo,
            user: {
              ...state.doctorInfo.user,
              phoneNumber: action.payload,
            },
          },
        };
        case UPDATE_DOCTOR_PASS:
          return {
            ...state,
            doctorInfo: {
              ...state.doctorInfo,
              user: {
                ...state.doctorInfo.user,
                doctorPass: action.payload,
              },
            },
          };
          case UPDATE_DOCTOR_ROLE:
          return {
            ...state,
            doctorInfo: {
              ...state.doctorInfo,
              user: {
                ...state.doctorInfo.user,
                role: action.payload,
              },
            },
          };
      default:
        return state;
    }
  };
export default{ doctorRenderPaginate,doctorLoginReducer}