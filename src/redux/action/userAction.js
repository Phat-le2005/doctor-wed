import { CREATE_USER_ERROR, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, FERTCH_USER_ERROR, FERTCH_USER_REQUEST, FERTCH_USER_SUCCESS ,GET_ALL_PAGINATE_ERROR,GET_ALL_PAGINATE_REQUEST,GET_ALL_PAGINATE_SUCCESS} from "./types"
import axios from "axios"
export const createUserSuccess = (data)=>{
    return {
        type: CREATE_USER_SUCCESS,
        dataUser:data
    }
}

export const createUserRequest = (data)=>{
    return {
        type: CREATE_USER_REQUEST,
    }

}
export const createUserError = (data)=>{
    return {
        type: CREATE_USER_ERROR,
    }

}
export const createNewUserRedux=(user)=>{
    return async(dispatch,getState)=>{
        dispatch(createUserRequest());
        try {
            let {email,password,phoneNumber,firstName,lastName} =user
            let res = await axios.post("http://localhost:8082/api/post-user",{email,password,phoneNumber,firstName,lastName})
            if(res && res.data.errCode ===0){
                console.log(res)
                dispatch(createUserSuccess())
            }
        } catch (e) {
            dispatch(createUserError())
        }
    }
}
export const fertchUserRequest = () =>{
    return {
        type: FERTCH_USER_REQUEST,
    }
}
export const fertchUserSuccess = (user) =>{
    return {
        type: FERTCH_USER_SUCCESS,
        payload: user
    }
}
export const fertchUserError = () =>{
    return {
        type: FERTCH_USER_ERROR,
    }
}
export const getAllUserPaginateSuccess = (ListUser)=>{
    return {
        type: GET_ALL_PAGINATE_SUCCESS,
        payload: ListUser
    }
}
export const getAllUserPaginateRequest = ()=>{
    return {
        type: GET_ALL_PAGINATE_REQUEST,
    }
}
export const getAllUserPaginateError = ()=>{
    return {
        type: GET_ALL_PAGINATE_ERROR,
    }
}
export const doLogin = (user) => {
    return async (dispatch, getState) => {
        dispatch(fertchUserRequest());
        try {
            let { email, password } = user;
            let res = await axios.post("http://localhost:8082/api/login", { email, password });
            if (res && res.data.errCode === 0) {
                dispatch(fertchUserSuccess(res.data.user));
                return {success: true}
            }
        } catch (e) {
            dispatch(fertchUserError());
            return {success: false}
        }
    };
};
export const getAllUserPaginate=(pageNumber,limitNumber)=>{
    return async (dispatch,getState) =>{
        dispatch(getAllUserPaginateRequest());
         try {
            let res = await axios.get(`http://localhost:8082/api/get-all-users?page=${pageNumber}&limit=${limitNumber}`)
            if (res && res.data && res.data.errCode === 0) {
                dispatch(getAllUserPaginateSuccess(res.data));
                return res.data; // thêm return để component nhận dữ liệu!
              } else {
                dispatch(getAllUserPaginateError());
                return res.data;
              }
         } catch (error) {
            dispatch(getAllUserPaginateError())
         }
    }
}