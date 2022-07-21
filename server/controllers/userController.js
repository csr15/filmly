const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  catchReplyMessage,
  errorReplyMessage,
  successReplyMessage,
} = require("../helpers/helper");
const logger = require("../logger");
const db = require("../models");

require("dotenv").config({ path: "../config/.env" });

exports.loginHandler = async (request, reply) => {
  try {
    const data = await db.users.findOne({
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
      await db.users.create({
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
    if(request.params.isValid === true){
      reply(successReplyMessage("Token verified"));
    }else{
      reply(successReplyMessage("Error Token verified"));
    }
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getUserDetails = async (request, reply) => {
  try {
    const data = await db.users.findOne({
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
