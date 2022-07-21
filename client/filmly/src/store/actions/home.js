import axios from "axios";

import { API } from "../../utilities/constants/constants";
import { HOME_DATA, MOVIE_DETAILS, ALL_MOVIE_OF_ACTOR } from "../actionTypes";

export const getTopMoviesOfTop = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${API}/movie/home`,
        data: {
          gen1: "Action",
          gen2: "Thriller",
          gen3: "Comedy",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch({ type: HOME_DATA, payload: data.payload.data });
    } catch (error) {
      dispatch({ type: "ERROR" });
      console.log(error)
    }
  };
};
export const getMovieDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${API}/movie/details/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch({ type: MOVIE_DETAILS, payload: data.payload.data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};

export const getAllMoviesOfActor = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${API}/actor/movie/${id}`,
        data: {
          page: 0,
          pageSize: 30,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch({ type: ALL_MOVIE_OF_ACTOR, payload: data.payload.data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};

export const getAllMoviesOfDirector = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${API}/director/movie/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch({ type: ALL_MOVIE_OF_ACTOR, payload: data.payload.data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};
