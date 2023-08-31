import { LOGIN } from "../constants";

const initialState = {
  user: {},
  loading: true,
  isAuthenticated: false,
  Language: "EN",
  darkMode: false,
  fontType: "small",
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default ChatReducer;
