const { Op } = require("sequelize");
const { PAGE_SIZE } = require("../constants/constants");
const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const { Sequelize } = require("../models");
const db = require("../models");
const client = require("../redis");

const Actor = db.actor;
const Movie = db.movie;

exports.getAllActor = async (request, reply) => {
  try {
    const { page } = request.params;
    const offset = page * PAGE_SIZE;

    const data = await Actor.findAll({
      offset: offset,
      limit: PAGE_SIZE,
    });

    reply(successReplyMessage(data)).code(200);

    logger.log("info", "Successfully got list of directors");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of actors");
  }
};

exports.getAllMoviesofAllActor = async (request, reply) => {
  try {
    const allMovieOfAllActor = await client.get("all_movie_of_all_actor");

    if (allMovieOfAllActor === null) {
      const data = await Actor.findAll({
        include: Movie,
        raw: true,
        where: (Sequelize.fn("month", Sequelize.col("fromDate")), "mov_year"),
      });
      await client.set("all_movie_of_all_actor", JSON.stringify(data));
      reply(successReplyMessage(data)).code(200);
      logger.log("info", "Successfully got list of movies af all actor");
    } else {
      reply(successReplyMessage(JSON.parse(allMovieOfAllActor))).code(200);
      logger.log("info", "Successfully got list of movies af all actor");
    }
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies af all actor");
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
    reply(successReplyMessage(data)).code(200);
    logger.log("info", "Successfully got list of movies af an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting list of movies af an actor");
  }
};

exports.getActorMovieCount = async (request, reply) => {
  try {
    const data = await Actor.count({
      include: Movie,
      raw: true,
      where: {
        [Op.and]: [Sequelize.fn('EXTRACT(YEAR from "mov_year") =', 2022)],
        id: 17,
      },
    });
    reply(successReplyMessage(data)).code(200);
    logger.log("info", "Successfully got movie count of an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movie count of an actor");
  }
};

exports.addActor = async (request, reply) => {
  try {
    await Actor.create({
      ...request.payload,
    });

    reply(successReplyMessage("", "Actor added successfully!")).code(200);
    logger.log("info", "Successfully added an actor");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error adding an actor");
  }
};