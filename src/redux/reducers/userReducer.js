import { LOGIN, LOGOUT } from "../constants";

const initialState = {
  user: {},
  loading: true,
  isAuthenticated: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
