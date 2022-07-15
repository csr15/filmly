import axios from "axios";
import { HOME_DATA, MOVIE_DETAILS } from "../actionTypes";

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
