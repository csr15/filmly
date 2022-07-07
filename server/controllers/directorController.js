const { PAGE_SIZE } = require("../constants/constants");
const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const db = require("../models");

const Director = db.director;
const Movie = db.movie;

exports.getAllDirector = async (request, reply) => {
  try {
    const { page } = request.params;
    const offset = page * PAGE_SIZE;

    const data = await Director.findAll({
      offset: offset,
      limit: PAGE_SIZE,
    });

    reply(successReplyMessage(data)).code(200);

    logger.log("info", "Successfully got list of directors");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of directord");
  }
};

exports.getAllMoviesOfAllDirector = async (request, reply) => {
  try {
    const result = await Movie.findAll({
      include: Director,
    });

    reply(successReplyMessage(result)).code(200);
    logger.log("info", "Successfully got list of movies of all directors");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies of all director");
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
    logger.log("info", "Successfully got list of movies of a director");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies of a director");
  }
};

exports.addDirector = async (request, reply) => {
  try {
    await Director.create({
      ...request.payload,
    });

    reply(successReplyMessage("", "Director added successfully!")).code(200);
    logger.log("info", "Successfully added a new director");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error while adding a new diorector");
  }
};
