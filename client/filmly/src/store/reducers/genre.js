import { ALL_GENRES, ALL_MOVIES_OF_GENRE } from "../actionTypes";

const initialState = {
  allGenres: [],
  allMoviesOfGenre: []
};

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
    case ALL_MOVIES_OF_GENRE: 
      return{
        ...state,
        allMoviesOfGenre: action.payload
      }
    default:
      return state;
  }
};

export default genreReducer;
