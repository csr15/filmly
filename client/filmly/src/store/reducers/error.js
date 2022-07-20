import { ERROR, RESET_ERROR } from "../actionTypes";

const initialState = {
  isError: false,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        isError: true,
      };
    case RESET_ERROR:
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
};

export default errorReducer;
