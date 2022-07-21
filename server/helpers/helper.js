const {
  SUCCESS,
  INTERNAL_SERVER_ERROR_CODE,
  ACCESS_TOKEN_EXPIRED,
  BAD_REQUEST_CODE,
  FORBIDDEN,
  SERVER_ERROR,
} = require("../constants/constants");
const client = require("../redis/index");

const jwt = require("jsonwebtoken");
const logger = require("../logger");

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
    type: SERVER_ERROR,
  };
};

exports.accessTokenExpired = (message, status) => {
  return {
    message: "Access token expired, Please login again!",
    status: FORBIDDEN,
    type: ACCESS_TOKEN_EXPIRED,
  };
};

exports.validateTokenHandler = (request) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (
    request.url.pathname === "/api/v1/login" ||
    request.url.pathname === "/api/v1/signup"
  ) {
    reply.continue();
  } else {
    if (token !== undefined) {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
          reply(accessTokenExpired());

          logger.log("error", "Access token expired", err);
        } else {
          if (user === null) {
            logger.log("error", "Access token expired");
            return reply(accessTokenExpired());
          } else {
            logger.log("info", "Request granted");
            return reply.continue();
          }
        }
      });
    } else {
      reply(catchReplyMessage("Please provide access token"));
    }
  }
};

exports.rateLimiter = async (request, reply) => {
  try {
    const ip = request.info.remoteAddress;

    const getData = await client.get(ip);
    if (getData !== null) {
      const count = JSON.parse(getData);

      if (count == 10) {
        reply({ error: 1, message: "Throttle Limit exceeded." });
        logger.log("info", "Throttle limit exceeded.");
      } else {
        await client.incr(ip);
        return reply.continue();
      }
    } else {
      await client.set(ip, 0);
      await client.expire(ip, 30);
      logger.log(
        "info",
        `Rate limit for ${request.info.remoteAddress} limit exceeded.`
      );
      return reply.continue();
    }
  } catch (error) {
    logger.log("error", "Error while checking rate limit");
    return reply.continue();
  }
};
