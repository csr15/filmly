import { HOME_DATA, MOVIE_DETAILS } from "../actionTypes";

const initialState = {
  homeData: [],
  movieDetails: "",
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_DATA:
      return {
        ...state,
        homeData: action.payload,
      };
    case MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
