import axios from "axios";

export const loginAction = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/login",
        userData
      );

      if (data.type === "invalidCredentials") {
        dispatch({ type: "INVALID_CREDENTIALS" });
      }

      if (data.type === "success") {
        const { payload } = data;
        if (payload.data.token !== undefined && payload.data.token !== null) {
          localStorage.setItem("token", payload.data.token);

          dispatch({ type: "SIGNIN", payload: data });
        }
      }
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};

export const signupAction = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/signup",
        userData
      );

      if (data.type === "success") {
        dispatch({ type: "SIGNUP", payload: data });
      }
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};

export const validateToken = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/validateToken",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(data);
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};
