import React, { useEffect } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { auth, provider, signInGooglePopup } from "../api/firebase";
import icon from "../assets/icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("signInWithPopupGoogle", result);
        dispatch({
          type: "LOGIN",
          payload: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={icon} alt="" />
        <div className="login__text">
          <h1>Sign in to Chatie</h1>
          <span>Sign in from one of the login methods below.</span>
        </div>

        <Button type="submit" onClick={signIn}>
          <p>Sign in with Google</p>
        </Button>
      </div>
    </div>
  );
}

export default Login;
