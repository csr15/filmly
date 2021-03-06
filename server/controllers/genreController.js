const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const logger = require("../logger");
const db = require("../models");
const client = require("../redis");
const { GenreFindAll, GenreCreate, MovieFindAll } = require("../utils/dbQuery");

const Genre = db.genre;
const Movie = db.movie;

exports.getAllGenre = async (request, reply) => {
  try {
    const data = await GenreFindAll();

    reply(successReplyMessage(data));
    logger.log("info", "Successfully got list of genres");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of genres", error);
  }
};

exports.getAllMoviesGenre = async (request, reply) => {
  try {
    const allMovieGenre = await client.get("all_movie_genre");

    if (allMovieGenre === null) {
      const data = await MovieFindAll({
        include: Genre,
      });

      await client.set("all_movie_genre", JSON.stringify(data));
      reply(successReplyMessage(data));
      logger.log("info", "Successfully got list of movies of all genre");
    } else {
      reply(successReplyMessage(JSON.parse(allMovieGenre)));
      logger.log("info", "Successfully got list of movies of all genre");
    }
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies of all genre", error);
  }
};

exports.getAllMoviesOfSingleGenre = async (request, reply) => {
  try {
    const { page, pageSize } = request.payload;
    const offset = page * pageSize;

    const result = await GenreFindAll({
      include: Movie,
      where: {
        gen_title: request.params.title,
      },
      offset: offset,
      limit: pageSize,
    });

    reply(successReplyMessage(result));
    logger.log("info", "Successfully got list of movies by genre");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies by genre", error);
  }
};

exports.addGenre = async (request, reply) => {
  try {
    await GenreCreate({
      ...request.payload,
    });

    reply(successReplyMessage("", "Genre added successfully!"));
    logger.log("info", "Successfully created a new genre");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error while creating a new genre", error);
  }
};
