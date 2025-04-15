import { combineReducers } from 'redux';
import {userLoginReducer,userReducer} from './userReducer';
import userPaginate from './UserPaginate'
import departmentReducer from './departmentReducer';
import doctorReducer from './doctorReducer';
// import userReducer from './userReducer';
const rootReducer = combineReducers({
    users: userReducer,
    userLogin: userLoginReducer,
    userPaginate: userPaginate.userRenderPaginate,
    departmentRender: departmentReducer.departmentRender,
    doctorRender : doctorReducer

});

export default rootReducer;