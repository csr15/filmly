const {
  SUCCESS,
  INTERNAL_SERVER_ERROR_CODE,
  ACCESS_TOKEN_EXPIRED,
  BAD_REQUEST_CODE,
  FORBIDDEN,
} = require("../constants/constants");

exports.successReplyMessage = (data, message) => {
  return {
    message: message ? message : "Data retrieved successfully",
    status: SUCCESS,
    type: "success",
    payload: {
      data: data,
    },
  };
};

exports.errorReplyMessage = (message, status, type) => {
  return {
    message: message,
    status: status ? status : BAD_REQUEST_CODE,
    type: type ? type : ERROR,
  };
};

exports.catchReplyMessage = (message, status) => {
  return {
    message: message ? message : "Server error",
    status: status ? status : INTERNAL_SERVER_ERROR_CODE,
    type: SERVER_ERROR
  };
};

exports.accessTokenExpired = (message, status) => {
  return {
    message: "Access token expired, Please login again!",
    status: FORBIDDEN,
    type: ACCESS_TOKEN_EXPIRED,
  };
};
