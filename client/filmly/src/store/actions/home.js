import axios from "axios";
import { HOME_DATA, MOVIE_DETAILS, ALL_MOVIE_OF_ACTOR } from "../actionTypes";

export const getTopMoviesOfTop = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:8080/api/v1/movie/home",
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
    }
  };
};
export const getMovieDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:8080/api/v1/movie/details/${id}`,
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
        url: `http://localhost:8080/api/v1/actor/movie/${id}`,
        data: {
          page: 0,
          pageSize: 30,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(data);
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
        url: `http://localhost:8080/api/v1/director/movie/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(data);
      dispatch({ type: ALL_MOVIE_OF_ACTOR, payload: data.payload.data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};
