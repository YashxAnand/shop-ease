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

export default (state, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        errors: null,
      };
    case LOGIN_FAILED:
    case AUTH_ERRORS:
    case REGISTER_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        errors: action.payload,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case LOAD_USER:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        token: localStorage.getItem("token"),
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };
  }
};
