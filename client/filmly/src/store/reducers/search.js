import { SEARCH, RESET_SEARCH } from "../actionTypes";

const initialState = {
  searchData: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchData:
          action.selectedOption === "Movie"
            ? action.payload
            : [...state.searchData, ...action.payload],
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchData: "",
      };
    default:
      return state;
  }
};

export default searchReducer;
