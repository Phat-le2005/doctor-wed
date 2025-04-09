import { FERTH_DEPARTMENT_REQUEST,FERTH_DEPARTMENT_SUCCESS,FERTH_DEPARTMENT_ERROR } from "../action/types";

const INITIAL_STATE = {
    listDepartment: [],
    isLoading: false,
    isError:false,
};
const departmentRender = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FERTH_DEPARTMENT_REQUEST:
            return {
                ...state, isLoading: true,
            };

        case FERTH_DEPARTMENT_SUCCESS:
            return {
                ...state, isLoading: false, isError: false, listDepartment: action.payload
            };

        case FERTH_DEPARTMENT_ERROR:
            return {
                ...state, isLoading: false, isError: true
            };

        default: return state;
    }
};
export default {
    departmentRender
};