import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  BOOKING_SUCCESS,
  BOOKING_FAIL,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  failed: false,
};

export default function foo(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);

      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case USER_LOADED_SUCCESS:
      localStorage.setItem("email", payload.email);
      localStorage.setItem("state", payload.state);
      localStorage.setItem("phone", payload.phone_number);

      return {
        ...state,
        user: payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        failed: true,
      };
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem("email");
      localStorage.removeItem("state");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        failed: false,
      };
    case BOOKING_FAIL:
    case BOOKING_SUCCESS:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
