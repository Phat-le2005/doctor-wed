import { FERTCH_USER_LOGOUT,CREATE_USER_ERROR, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, FERTCH_USER_ERROR, FERTCH_USER_REQUEST, FERTCH_USER_SUCCESS ,GET_ALL_PAGINATE_ERROR,GET_ALL_PAGINATE_REQUEST,GET_ALL_PAGINATE_SUCCESS} from "./types"
import axios from "axios"
import { toast } from "react-toastify"
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
export const getUserData = () => {
    return async (dispatch) => {
      dispatch(fertchUserRequest());
  
      try {
        const res = await axios.get("http://localhost:8082/api/get_user", {
          withCredentials: true // 👈 QUAN TRỌNG: gửi cookie
        });
        console.log("User data từ server:", res.data.user);
        if (res?.data?.user) {
            dispatch(fertchUserSuccess(res.data.user));
          }else {
          dispatch(fertchUserError());
          return { success: false };
        }
      } catch (e) {
        dispatch(fertchUserError());
        return { success: false };
      }
    };
  };
export const getAllUserPaginate=(pageNumber,limitNumber)=>{
    return async (dispatch,getState) =>{
        dispatch(getAllUserPaginateRequest());
         try {
            let res = await axios.get(`http://localhost:8082/api/get-all-users?page=${pageNumber}&limit=10`)
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
export const logoutUser = () => ({
    type: FERTCH_USER_LOGOUT,
  });
  
  // Thực hiện logout, xóa cookie trên client và reset Redux store
  export const logout = () => {
    return async (dispatch) => {
      try {
        // Xóa cookies access_token và refresh_token
        document.cookie = "access_token=; path=/; max-age=0;"; // Xóa access_token
        document.cookie = "refresh_token=; path=/; max-age=0;"; // Xóa refresh_token
  
        // Dispatch action logout thành công
        dispatch(logoutUser()); // Đảm bảo rằng action này reset lại thông tin người dùng trong store
  
        // Hiển thị thông báo thành công
        toast.success("Đăng xuất thành công", {
          position: "top-right",
          autoClose: 2000,
        });
  
        return { success: true }; // Trả về trạng thái thành công (có thể bỏ qua nếu không cần)
      } catch (error) {
        // Handle lỗi nếu có
        console.error("Error during logout:", error);
        toast.error("Đăng xuất thất bại", {
          position: "top-right",
          autoClose: 2000,
        });
        return { success: false, error: error.message };
      }
    };
  };
  