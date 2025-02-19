import { CREATE_USER_ERROR, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, FERTCH_USER_ERROR, FERTCH_USER_REQUEST, FERTCH_USER_SUCCESS } from "./types"
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
            let {email,password,phoneNumber,firstname,lastname} =user
            let res = await axios.post("http://localhost:8082/api/post-user",{email,password,phoneNumber,firstname,lastname})
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
