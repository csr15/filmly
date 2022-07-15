const {
  catchReplyMessage,
  errorReplyMessage,
  successReplyMessage,
} = require("../helpers/helper");
const logger = require("../logger");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

require("dotenv").config({ path: "../config/.env" });

exports.loginHandler = async (request, reply) => {
  try {
    const data = await db.users.findOne({
      where: {
        mail: request.payload.mail,
      },
    });

    if (data === null) {
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
                expiresIn: "60s",
                algorithm: "HS256",
              }
            );

            const userData = {
              id: data.id,
              mail: data.mail,
              name: data.name,
              token: accessToken,
            };

            reply(successReplyMessage(userData, ""));
          }
        }
      );
    }
  } catch (error) {
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

      return reply(successReplyMessage("", "Account created successfully!"));
    });
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.validateToken = async (request, reply) => {
  try {
    reply(successReplyMessage("Token verified"));
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

    reply(successReplyMessage(data));
  } catch (error) {
    reply(catchReplyMessage());
  }
};
