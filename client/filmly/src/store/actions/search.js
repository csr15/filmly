import axios from "axios";

const { SEARCH } = require("../actionTypes");

export const searchHandler = (searchTerm, selectedOption) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `http://localhost:8080/api/v1/movie/search`,
        data: {
          searchTerm: searchTerm,
          selectedOption: selectedOption,
          page: 0,
          pageSize: 10,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(data);
      dispatch({
        type: SEARCH,
        payload: data.payload.data,
        selectedOption: selectedOption,
      });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};
