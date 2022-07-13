import axios from "axios";

export const getTopMoviesOfTop = () => {
  return async (dispatch) => {
    try {
      const data = await Promise.all([
        axios.post("http://localhost:8080/api/v1/genre/movie/Action", {
          page: 0,
          pageSize: 10,
        }),
        axios.post("http://localhost:8080/api/v1/genre/movie/Triller", {
          page: 0,
          pageSize: 10,
        }),
        axios.post("http://localhost:8080/api/v1/genre/movie/Comedy", {
          page: 0,
          pageSize: 10,
        }),
      ]);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
