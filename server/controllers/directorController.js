const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const logger = require("../logger");
const db = require("../models");
const { DirectorFindAll, DirectorCreate } = require("../utils/dbQuery");

const Movie = db.movie;

exports.getAllDirector = async (request, reply) => {
  try {
    const { page, pageSize } = request.payload;
    const offset = page * pageSize;

    const data = await DirectorFindAll({
      offset: offset,
      limit: pageSize,
    });

    reply(successReplyMessage(data));
    logger.log("info", "Successfully got list of directors");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of directord", error);
  }
};

exports.getAllMoviesOfAllDirector = async (request, reply) => {
  try {
    const result = await DirectorFindAll({
      include: Movie,
    });

    reply(successReplyMessage(result));
    logger.log("info", "Successfully got list of movies of all directors");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies of all director", error);
  }
};

exports.getAllMoviesOfDirector = async (request, reply) => {
  try {
    const result = await DirectorFindAll({
      include: Movie,
      where: {
        id: request.params.id,
      },
    });

    reply(successReplyMessage(result));
    logger.log("info", "Successfully got list of movies of a director");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies of a director", error);
  }
};

exports.addDirector = async (request, reply) => {
  try {
    await DirectorCreate({
      ...request.payload,
    });

    reply(successReplyMessage("", "Director added successfully!"));
    logger.log("info", "Successfully added a new director");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error while adding a new diorector", error);
  }
};
