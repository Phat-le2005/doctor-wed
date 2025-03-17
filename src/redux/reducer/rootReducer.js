import { combineReducers } from 'redux';
import user from './userReducer';
import userPaginate from './UserPaginate'
// import userReducer from './userReducer';
const rootReducer = combineReducers({
    users: user.userReducer,
    userLogin: user.userLoginReducer,
    userPaginate: userPaginate.userRenderPaginate
});

export default rootReducer;