import { FERTCH_USER_LOGOUT,CREATE_USER_ERROR, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, FERTCH_USER_ERROR, FERTCH_USER_REQUEST, FERTCH_USER_SUCCESS, GET_ALL_PAGINATE_ERROR, GET_ALL_PAGINATE_REQUEST, GET_ALL_PAGINATE_SUCCESS } from "../action/types";

const INITIAL_STATE = {
    listUser: [],
    user:{},
    isLoading: false,
    isError:false,
    isCreating: false,
    userLogin: null,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {
                ...state, isCreating: true
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state, isCreating: false,
            };
            case CREATE_USER_ERROR:
                return {
                    ...state, isCreating: false,
                };
        default: return state;
    }
};
const userLoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FERTCH_USER_LOGOUT:
            return {
              ...state,
              userLogin: null, // Xóa thông tin người dùng khi logout
            };
      case FERTCH_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
  
      case FERTCH_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          userLogin: action.payload, // Cập nhật thông tin người dùng khi thành công
        };
  
      case FERTCH_USER_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
      default:
        return state;
    }
  };
export  {userReducer,
    userLoginReducer
};