import axios from "axios";

import { API } from "../../utilities/constants/constants";
const { SEARCH } = require("../actionTypes");

export const searchHandler = (searchTerm, selectedOption) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${API}/movie/search`,
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
