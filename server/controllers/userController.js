const { catchReplyMessage } = require("../helpers/helper");
const logger = require("../logger");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../config/.env" });

exports.loginHandler = async (request, reply) => {
  try {
    const userName = request.payload.userName;
    const user = {
      name: userName,
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: '20s',
    });

    reply(accessToken);
  } catch (error) {
    console.log(error);
    reply(catchReplyMessage());
    logger("Login error", error);
  }
};
