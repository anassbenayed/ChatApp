import { LOGIN } from "../constants";

export const signin = (userLog, navigate) => async (dispatch) => {
  try {
    // firebase stuff
    dispatch({ type: LOGIN, payload: true });
    localStorage.setItem("username", response.data.username);
    navigate("./home", { replace: true });
  } catch (err) {
    dispatch({ type: LOGIN, payload: false });
  }
};
