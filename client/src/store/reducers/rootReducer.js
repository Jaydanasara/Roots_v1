
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
authR: authReducer,
userR:userReducer

})








export default rootReducer;