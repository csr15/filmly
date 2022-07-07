const { Op } = require("sequelize");
const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const { Sequelize } = require("../models");
const db = require("../models");
const logger = require("../logger/index");

const { PAGE_SIZE } = require("../constants/constants");
const Movie = db.movie;

exports.getAllMovie = async (request, reply) => {
  try {
    const { page, pageSize } = request.params;

    const data = await Movie.findAll({
      offset: offset,
      limit: PAGE_SIZE,
    });

    reply(successReplyMessage(data)).code(200);
    logger.log("info", "Successfully got list of movies");
  } catch (error) {
    reply(catchReplyMessage());

    logger.log("error", "Error getting list of movies");
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

    logger.log("info", "Successfully got a movie with ID");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movie by ID");
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

    logger.log("info", "Successfully got movies released this month");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movies released by this month");
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

    logger.log("info", "Successfully got list of movies by languages");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movie by language");
  }
};

exports.addNewMovie = async (request, reply) => {
  try {
    const { id, mov_title, mov_year, mov_lang, mov_region, mov_time } =
      request.payload;
    const newMovie = await Movie.create({
      id: id,
      mov_title: mov_title,
      mov_year: mov_year,
      mov_region: mov_region,
      mov_time: mov_time,
    });

    await newMovie.addActor(request.payload.actorId, {
      through: { selfGranted: false },
    });

    await newMovie.addDirector(request.payload.directorId, {
      through: { selfGranted: false },
    });

    await newMovie.addGenre(request.payload.genreId, {
      through: { selfGranted: false },
    });

    reply(successReplyMessage("", "Movie created successfully!")).code(200);

    logger.log("info", "Movie created successfully!");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error creating a movie");
  }
};
