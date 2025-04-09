import { combineReducers } from 'redux';
import user from './userReducer';
import userPaginate from './UserPaginate'
import departmentReducer from './departmentReducer';
import doctorReducer from './doctorReducer';
// import userReducer from './userReducer';
const rootReducer = combineReducers({
    users: user.userReducer,
    userLogin: user.userLoginReducer,
    userPaginate: userPaginate.userRenderPaginate,
    departmentRender: departmentReducer.departmentRender,
    doctorRender : doctorReducer

});

export default rootReducer;