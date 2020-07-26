import {
  LOGIN,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_FAILED,
  CLEAR_ERRORS,
  LOAD_USER,
  AUTH_ERRORS,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  CLEAR_MESSAGES,
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
    case UPDATE_USER_FAILED:
      return {
        ...state,
        update_failed: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        update_success: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        update_failed: null,
        update_success: null,
      };
    default:
      return state;
  }
};
