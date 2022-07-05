const { Op } = require("sequelize");
const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const { Sequelize } = require("../models");
const db = require("../models");

const Actor = db.actor;
const Movie = db.movie;

exports.getAllActor = async (request, reply) => {
  try {
    const data = await Actor.findAll();
    reply(successReplyMessage(data)).code(200);
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getAllMoviesofAllActor = async (request, reply) => {
  try {
    const data = await Actor.findAll({
      include: Movie,
      raw: true,
      where: (Sequelize.fn("month", Sequelize.col("fromDate")), "mov_year"),
    });
    reply(successReplyMessage(data)).code(200);
  } catch (error) {
    console.log(error);
    reply(catchReplyMessage());
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
  } catch (error) {
    console.log(error);
    reply(catchReplyMessage());
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
  } catch (error) {
    console.log(error);
    reply(catchReplyMessage());
  }
};
