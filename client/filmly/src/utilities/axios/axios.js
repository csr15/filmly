import { API } from "../constants/constants";

const axios = require("axios");

const request = async ({ method, url, body }) => {
  try {
    let requestModel = {
      method: method,
      url: `${API}/${url}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (method === "POST") {
      requestModel = {
        ...requestModel,
        data: body,
      };
    }

    console.log(requestModel);

    const { data } = await axios(requestModel);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default request;
