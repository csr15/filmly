const { Op } = require("sequelize");

const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const logger = require("../logger");
const db = require("../models");
const { Sequelize } = require("../models");
const { ActorFindAll, ActorCreate } = require("../utils/dbQuery");

const Movie = db.movie;

exports.getAllActor = async (request, reply) => {
  try {
    const { page, pageSize } = request.payload;
    const offset = page * pageSize;

    const data = await ActorFindAll({
      offset: offset,
      limit: pageSize,
    });

    reply(successReplyMessage(data));
    logger.log("info", "Successfully got list of directors");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of actors", error);
  }
};

exports.getAllMoviesofAllActor = async (request, reply) => {
  try {
    const data = await ActorFindAll({
      include: Movie,
      raw: true,
    });

    reply(successReplyMessage(data));
    logger.log("info", "Successfully got list of movies af all actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies af all actor", error);
  }
};

exports.getAllMoviesofActor = async (request, reply) => {
  try {
    const { page, pageSize } = request.payload;
    const offset = page * pageSize;
    const data = await ActorFindAll({
      include: Movie,
      where: {
        id: request.params.id,
      },
      limit: pageSize,
      offset: offset,
    });

    reply(successReplyMessage(data));
    logger.log("info", "Successfully got list of movies af an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies af an actor", error);
  }
};

exports.getActorMovieCountByThisYear = async (request, reply) => {
  try {
    const data = await ActorCount({
      include: Movie,
      raw: true,
      where: {
        [Op.and]: [Sequelize.fn('EXTRACT(YEAR from "mov_year") =', 2022)],
        id: request.params.id,
      },
    });

    reply(successReplyMessage({ count: data }));
    logger.log("info", "Successfully got movie count of an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movie count of an actor", error);
  }
};

exports.addActor = async (request, reply) => {
  try {
    await ActorCreate({
      ...request.payload,
    });

    reply(successReplyMessage("", "Actor added successfully!"));
    logger.log("info", "Successfully added an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error adding an actor", error);
  }
};
