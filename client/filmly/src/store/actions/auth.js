import axios from "axios";

import { API } from "../../utilities/constants/constants";
import { SIGIN_IN, ERROR, USER_DETAILS } from "../actionTypes";

export const loginAction = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API}/login`, userData);

      if (data.type === "invalidCredentials") {
        dispatch({ type: "INVALID_CREDENTIALS" });
      }

      if (data.type === "success") {
        const { payload } = data;
        if (payload.data.token !== undefined && payload.data.token !== null) {
          localStorage.setItem("token", payload.data.token);
          localStorage.setItem("userId", payload.data.id);
          dispatch({ type: SIGIN_IN, payload: data.payload.data });
        }
      }
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };
};

export const signupAction = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API}/signup`, userData);

      if (data.type === "success") {
        dispatch({ type: "SIGNUP", payload: data });
      }
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};

export const getUserDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${API}/user/${id}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch({ type: USER_DETAILS, payload: data.payload.data });
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };
};

// export const validateToken = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`${API}/genre/all`, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log(data);
//     } catch (error) {
//       dispatch({ type: ERROR });
//     }
//   };
// };
