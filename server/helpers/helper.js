const {
  ERROR,
  SUCCESS,
  INTERNAL_SERVER_ERROR_CODE,
} = require("../constants/constants");

exports.successReplyMessage = (data, message) => {
  return {
    message: message ? message : "Data retrieved successfully",
    status: SUCCESS,
    data: data,
  };
};

exports.errorReplyMessage = (message, status) => {
  return {
    message: message,
    status: status ? status : ERROR,
  };
};

exports.catchReplyMessage = (message, status) => {
  return {
    message: message ? message : "Server error",
    status: status ? status : INTERNAL_SERVER_ERROR_CODE,
  };
};
