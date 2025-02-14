import { combineReducers } from 'redux';
import user from './userReducer';
// import userReducer from './userReducer';
const rootReducer = combineReducers({
    users: user.userReducer,
    userLogin: user.userLoginReducer
});

export default rootReducer;