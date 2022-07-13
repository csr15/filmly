const { Op } = require("sequelize");
const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const { Sequelize } = require("../models");
const db = require("../models");

const Actor = db.actor;
const Movie = db.movie;

exports.getAllActor = async (request, reply) => {
  try {
    const { page, pageSize } = request.payload;
    const offset = page * pageSize;

    const data = await Actor.findAll({
      offset: offset,
      limit: pageSize,
    });

    reply(successReplyMessage(data))

    logger.log("info", "Successfully got list of directors");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of actors", error);
  }
};

exports.getAllMoviesofAllActor = async (request, reply) => {
  try {
    const data = await Actor.findAll({
      include: Movie,
      raw: true,
    });
    reply(successReplyMessage(data))
    logger.log("info", "Successfully got list of movies af all actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies af all actor", error);
  }
};

exports.getAllMoviesofActor = async (request, reply) => {
  try {
    const data = await Actor.findAll({
      include: Movie,
      raw: true,
      where: {
        id: request.params.id,
      },
    });
    reply(successReplyMessage(data))
    logger.log("info", "Successfully got list of movies af an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies af an actor", error);
  }
};

exports.getActorMovieCountByThisYear = async (request, reply) => {
  try {
    const data = await Actor.count({
      include: Movie,
      raw: true,
      where: {
        [Op.and]: [Sequelize.fn('EXTRACT(YEAR from "mov_year") =', 2022)],
        id: request.params.id,
      },
    });
    reply(successReplyMessage({ count: data }));;
    logger.log("info", "Successfully got movie count of an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movie count of an actor", error);
  }
};

exports.addActor = async (request, reply) => {
  try {
    await Actor.create({
      ...request.payload,
    });

    reply(successReplyMessage("", "Actor added successfully!"));;
    logger.log("info", "Successfully added an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error adding an actor", error);
  }
};
