const initialState = {
  isAuthenticated: false,
  isSignedUp: false,
  isInvalidCredentials: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        isAuthenticated: true,
        mail: action.payload.mail,
        id: action.payload.id,
      };
    case "INVALID_CREDENTIALS":
      return {
        ...state,
        isInvalidCredentials: true,
      };
    case "SIGNUP":
      return {
        ...state,
        isSignedUp: true,
      };
    case "RESET_SIGNUP":
      return {
        ...state,
        isSignedUp: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
