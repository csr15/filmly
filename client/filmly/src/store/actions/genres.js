import axios from "axios";

import { API } from "../../utilities/constants/constants";
import { ALL_GENRES, ALL_MOVIES_OF_GENRE, ERROR } from "../actionTypes";

export const getAllGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${API}/genre/all`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch({ type: ALL_GENRES, payload: data.payload.data });
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };
};

export const getAllMoviesOfGenre = (genre) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${API}/genre/movie/${genre}`,
        data: {
          page: 0,
          pageSize: 10,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch({ type: ALL_MOVIES_OF_GENRE, payload: data.payload.data });
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };
};
