const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const db = require("../models");

const Director = db.director;
const Movie = db.movie;

exports.getAllDirector = async (request, reply) => {
  try {
    const data = await Director.findAll();
    reply(successReplyMessage(data)).code(200);
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getAllMoviesOfAllDirector = async (request, reply) => {
  try {
    const result = await Movie.findAll({
      include: Director,
    });

    reply(successReplyMessage(result)).code(200);
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getAllMoviesOfDirector = async (request, reply) => {
  try {
    const result = await Director.findAll({
      include: Movie,
      raw: true,
      where: {
        id: request.params.id,
      },
    });

    reply(successReplyMessage(result)).code(200);
  } catch (error) {
    reply(catchReplyMessage());
  }
};
