const { Op } = require("sequelize");
const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const { Sequelize } = require("../models");
const db = require("../models");

const Movie = db.movie;

exports.getAllMovie = async (request, reply) => {
  try {
    const data = await Movie.findAll();
    reply(successReplyMessage(data)).code(200);
  } catch (error) {
    console.log(error);
    reply(catchReplyMessage());
  }
};

exports.getMovie = async (request, reply) => {
  try {
    const data = await Movie.findAll({
      where: {
        id: request.params.id,
      },
    });
    reply(successReplyMessage(data)).code(200);
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getMovieReleasedThisMonth = async (request, reply) => {
  try {
    const data = await Movie.findAll({
      where: {
        [Op.and]: [Sequelize.fn('EXTRACT(MONTH from "mov_year") =', 6)],
      },
    });

    reply(successReplyMessage(data)).code(200);
  } catch (error) {
    console.log(error);
    reply(catchReplyMessage());
  }
};

exports.getMovieByLanguage = async (request, reply) => {
  try {
    const data = await Movie.findAll({
      where: {
        mov_lang: {
          [Op.like]: `%${request.params.name}%`,
        },
      },
    });
    reply(successReplyMessage(data)).code(200);
  } catch (error) {
    reply(catchReplyMessage());
  }
};
