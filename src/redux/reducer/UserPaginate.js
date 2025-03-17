import {  GET_ALL_PAGINATE_ERROR, GET_ALL_PAGINATE_REQUEST, GET_ALL_PAGINATE_SUCCESS } from "../action/types";
const initialState = {
    users: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0
  };
const userRenderPaginate = (state = initialState, action)=>{
    switch(action.type){
        case GET_ALL_PAGINATE_REQUEST:
            return{
                ...state,isLoading: true,
            }
        case GET_ALL_PAGINATE_SUCCESS:
            return{
                ...state,isLoading: false,listUser: action.payload.data,totalPages: action.payload.totalPages,page: action.payload.page
            }
        case GET_ALL_PAGINATE_ERROR:
            return{
                ...state,isLoading:false
            }
            default:
                return state; 
            
    }
}
export default {
    userRenderPaginate: userRenderPaginate
}