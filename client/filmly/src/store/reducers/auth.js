import {
  INVALID_CREDENTIALS,
  LOGOUT,
  RESET_SIGNUP,
  SIGIN_IN,
  SIGN_UP,
  USER_DETAILS,
} from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  isSignedUp: false,
  isInvalidCredentials: false,
  userData: "",
  userDetails: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGIN_IN:
      return {
        ...state,
        isAuthenticated: true,
        userDetails: action.payload
      };
    case INVALID_CREDENTIALS:
      return {
        ...state,
        isInvalidCredentials: true,
      };
    case SIGN_UP:
      return {
        ...state,
        isSignedUp: true,
      };
    case RESET_SIGNUP:
      return {
        ...state,
        isSignedUp: false,
      };
    case USER_DETAILS:
      return {
        ...state,
        isAuthenticated: true,
        userDetails: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
