import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import ChatReducer from "./chatReducer";

const rootReducer = combineReducers({
  UserReducer,
  ChatReducer,
});

export default rootReducer;
