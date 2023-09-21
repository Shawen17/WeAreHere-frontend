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
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  BOOKING_SUCCESS,
  BOOKING_FAIL,
} from "./types";
import axios from "axios";
import api from "../components/Api";

export const checkIsAuthenticated = () => async (dispatch: any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/auth/jwt/verify/`,
        body,
        config
      );
      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATION_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATION_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATION_FAIL,
      });
    }

    dispatch({
      type: AUTHENTICATION_SUCCESS,
    });
  } else {
    dispatch({
      type: AUTHENTICATION_FAIL,
    });
  }
};

export const load_user = () => async (dispatch: any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/auth/users/me/`,
        config
      );
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/auth/jwt/create/`,
        body,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(load_user());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const signup = (data: any) => async (dispatch: any) => {
  let body, config;
  const entriesArray = Array.from(data.entries());
  const numberOfEntries = entriesArray.length;
  if (numberOfEntries > 8) {
    config = {};
  } else {
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  body = data;
  try {
    const res = await api.post("users/", body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const verify = (uid: string, token: string) => async (dispatch: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/auth/users/activation/`,
      body,
      config
    );
    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const reset_password = (email: string) => async (dispatch: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/auth/users/reset_password/`,
      body,
      config
    );
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const password_reset_confirm =
  (uid: string, token: string, new_password: string, re_new_password: string) =>
  async (dispatch: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
      await axios.post(
        `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }
  };

export const logout = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT,
  });
};

export const makeBooking =
  (
    email: string,
    address: string,
    state: string,
    date: Date,
    service: string
  ) =>
  async (dispatch: any) => {
    if (localStorage.getItem("access")) {
      const body = JSON.stringify({
        email,
        address,
        date,
        state,
        service,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/book/`,
          body,
          config
        );
        if (res.data.code !== "token_not_valid") {
          dispatch({
            type: BOOKING_SUCCESS,
          });
        } else {
          dispatch({
            type: BOOKING_FAIL,
          });
        }
      } catch (err: any) {
        if (err.response.status === 400) {
          alert("failed to submit, fill all fields");
        }
      }
    } else {
      dispatch({
        type: BOOKING_FAIL,
      });
    }
  };
