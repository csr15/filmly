import { ALL_MOVIE_OF_ACTOR, HOME_DATA, MOVIE_DETAILS } from "../actionTypes";

const initialState = {
  homeData: [],
  movieDetails: "",
  allMoviesOfActor: "",
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
    case ALL_MOVIE_OF_ACTOR:
      return {
        ...state,
        allMoviesOfActor: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
