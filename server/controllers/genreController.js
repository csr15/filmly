const { PAGE_SIZE } = require("../constants/constants");
const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const db = require("../models");
const client = require("../redis");

const Genre = db.genre;
const Movie = db.movie;

exports.getAllGenre = async (request, reply) => {
  try {
    const { page } = request.params;
    const offset = page * PAGE_SIZE;

    const data = await Genre.findAll({
      offset: offset,
      limit: PAGE_SIZE,
    });

    reply(successReplyMessage(data)).code(200);

    logger.log("info", "Successfully got list of genres");
  } catch (error) {
    reply(catchReplyMessage());

    logger.log("error", "Error getting list of genres");
  }
};

exports.getAllMoviesGenre = async (request, reply) => {
  try {
    const allMovieGenre = await client.get("all_movie_genre");

    if (allMovieGenre === null) {
      const data = await Movie.findAll({
        include: Genre,
      });

      await client.set("all_movie_genre", JSON.stringify(data));
      reply(successReplyMessage(data)).code(200);
      logger.log("info", "Successfully got list of movies of all genre");
    } else {
      reply(successReplyMessage(JSON.parse(allMovieGenre))).code(200);
      logger.log("info", "Successfully got list of movies of all genre");
    }
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies of all genre");
  }
};

exports.getAllMoviesOfSingleGenre = async (request, reply) => {
  try {
    const result = await Genre.findAll({
      include: Movie,
      raw: true,
      where: {
        id: request.params.id,
      },
    });
    reply(successReplyMessage(result)).code(200);

    logger.log("info", "Successfully got list of movies by genre");
  } catch (error) {
    reply(catchReplyMessage());

    logger.log("error", "Error getting list of movies by genre");
  }
};

exports.addGenre = async (request, reply) => {
  try {
    await Genre.create({
      ...request.payload,
    });
    reply(successReplyMessage("", "Genre added successfully!")).code(200);

    logger.log("info", "Successfully created a new genre");
  } catch (error) {
    reply(catchReplyMessage());

    logger.log("error", "Error while creating a new genre");
  }
};
