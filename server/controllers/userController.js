const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  catchReplyMessage,
  errorReplyMessage,
  successReplyMessage,
  accessTokenExpired,
} = require("../helpers/helper");
const logger = require("../logger");

const { UserFindOne, UserCreate } = require("../utils/dbQuery");

require("dotenv").config({ path: "../config/.env" });

exports.loginHandler = async (request, reply) => {
  try {
    const data = await UserFindOne({
      where: {
        mail: request.payload.mail,
      },
    });

    if (data === null) {
      logger.log("error", "Bad credentials, Invalid email or password.");
      reply(
        errorReplyMessage("Invalid email or password", "", "invalidCredentials")
      );
    } else {
      bcrypt.compare(
        request.payload.password,
        data.dataValues.password,
        function (err, isValid) {
          if (!isValid) {
            reply(
              errorReplyMessage(
                "Invalid email or password",
                "",
                "invalidCredentials"
              )
            );
          } else {
            const accessToken = jwt.sign(
              data.dataValues,
              process.env.ACCESS_TOKEN,
              {
                expiresIn: "20s",
                algorithm: "HS256",
              }
            );

            const userData = {
              id: data.id,
              mail: data.mail,
              name: data.name,
              token: accessToken,
            };

            logger.log("info", "Logged in successfully!");
            reply(successReplyMessage(userData, ""));
          }
        }
      );
    }
  } catch (error) {
    logger.log("error", "Error while logging in.");
    reply(catchReplyMessage());
  }
};

exports.signupHandler = async (request, reply) => {
  try {
    const { name, password, mail } = request.payload;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) throw Error;
      await UserCreate({
        id: uuidv4(),
        name: name,
        password: hash,
        mail: mail,
      });

      logger.log("info", "Account created successfully!");
      return reply(successReplyMessage("", "Account created successfully!"));
    });
  } catch (error) {
    logger.log("error", "Error while creating account.");
    reply(catchReplyMessage());
  }
};

exports.validateToken = async (request, reply) => {
  try {
    const token = request.payload.token;

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
            logger.log("info", "Token verified successfully.");
            reply(successReplyMessage(user, "Token verified successfully!"));
          }
        }
      });
    } else {
      reply(catchReplyMessage("Please provide access token"));
    }
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getUserDetails = async (request, reply) => {
  try {
    const data = await UserFindOne({
      where: {
        id: request.params.id,
      },
    });

    logger.log("info", "Single user data retrieved successfully!");
    reply(successReplyMessage(data));
  } catch (error) {
    logger.log("error", "Error while a user details.");
    reply(catchReplyMessage());
  }
};
