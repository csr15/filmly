const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const db = require("../models");

const Genre = db.genre;
const Movie = db.movie;

exports.getAllGenre = async (request, reply) => {
  try {
    const data = await Genre.findAll();
    reply(successReplyMessage(data)).code(200);
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getAllMoviesGenre = async (request, reply) => {
  try {
    const result = await Movie.findAll({
      include: Genre,
    });

    reply(successReplyMessage(result)).code(200);
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getAllMoviesOfSingleGenre = async (request, reply) => {
  try {
    const result = await Genre.findAll({
      include: Movie,
      raw: true,
      where: {
        id: request.params.id
      },
    });

    reply(successReplyMessage(result)).code(200);
  } catch (error) {
    console.log(error)
    reply(catchReplyMessage());
  }
};
