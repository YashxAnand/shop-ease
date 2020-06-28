import React, { useReducer } from "react";
import axios from "axios";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import setAuthToken from "../../utils/SetAuthToken";
import {
  LOGIN,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_FAILED,
  CLEAR_ERRORS,
  LOAD_USER,
  AUTH_ERRORS,
  LOGOUT,
} from "../types";

const AuthState = props => {
  const initialState = {
    isAuthenticated: false,
    errors: null,
    token: localStorage.getItem("token"),
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Actions

  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/user");
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERRORS });
      clearErrors();
    }
  };

  const login = async login_data => {
    try {
      const res = await axios.post("/api/user/login", login_data);
      dispatch({ type: LOGIN, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGIN_FAILED, payload: err.response.data.msg });
      clearErrors();
    }
  };

  const registerUser = async formData => {
    try {
      const res = await axios.post("/api/user/register", formData);
      dispatch({ type: REGISTER, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAILED, payload: err.response.data.msg });
      clearErrors();
    }
  };

  const clearErrors = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ERRORS });
    }, 5000);
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        errors: state.errors,
        token: state.token,
        user: state.user,
        login,
        loadUser,
        logout,
        registerUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
