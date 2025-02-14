import { CREATE_USER_ERROR, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, FERTCH_USER_ERROR, FERTCH_USER_REQUEST, FERTCH_USER_SUCCESS } from "../action/types";

const INITIAL_STATE = {
    listUser: [],
    user:{},
    isLoading: false,
    isError:false,
    isCreating: false
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
        case FERTCH_USER_REQUEST:
            return {
                ...state, isLoading: true,
            };

        case FERTCH_USER_SUCCESS:
            return {
                ...state, isLoading: false, isError: false, userLogin: action.payload
            };

        case FERTCH_USER_ERROR:
            return {
                ...state, isLoading: false, isError: true
            };

        default: return state;
    }
};

export default {userReducer,
    userLoginReducer
};