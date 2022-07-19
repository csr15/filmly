const { Op } = require("sequelize");
const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const { Sequelize } = require("../models");
const db = require("../models");
const logger = require("../logger/index");

const Movie = db.movie;
const Genre = db.genre;
const Director = db.director;
const Actor = db.actor;

exports.getAllMovie = async (request, reply) => {
  try {
    const { page, pageSize } = request.payload;
    const offset = page * pageSize;

    const data = await Movie.findAll({
      offset: offset,
      limit: pageSize,
    });

    reply(successReplyMessage(data));
    logger.log("info", "Successfully got list of movies");
  } catch (error) {
    reply(catchReplyMessage());

    logger.log("error", "Error getting list of movies", error);
  }
};

exports.getMovie = async (request, reply) => {
  try {
    const data = await Movie.findAll({
      where: {
        id: request.params.id,
      },
    });
    reply(successReplyMessage(data));

    logger.log("info", "Successfully got a movie with ID");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movie by ID", error);
  }
};

exports.getMovieReleasedThisMonth = async (request, reply) => {
  try {
    const data = await Movie.findAll({
      where: {
        [Op.and]: [Sequelize.fn('EXTRACT(MONTH from "mov_year") =', 6)],
      },
    });
    reply(successReplyMessage(data));

    logger.log("info", "Successfully got movies released this month");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movies released by this month", error);
  }
};

exports.getMovieByLanguage = async (request, reply) => {
  try {
    const data = await Movie.findAll({
      where: {
        mov_lang: {
          [Op.like]: `%${request.payload.language}%`,
        },
      },
    });
    reply(successReplyMessage(data));

    logger.log("info", "Successfully got list of movies by languages");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error getting movie by language", error);
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

    reply(successReplyMessage("", "Movie created successfully!"));

    logger.log("info", "Movie created successfully!");
  } catch (error) {
    reply(catchReplyMessage());
    logger.log("error", "Error creating a movie", error);
  }
};

exports.getDataForHome = async (request, reply) => {
  try {
    const { gen1, gen2, gen3 } = request.payload;
    const MovieData = Movie.findAll({
      where: {
        [Op.and]: [Sequelize.fn('EXTRACT(MONTH from "mov_year") =', 6)],
      },
      limit: 1,
    });

    const Genre1 = Genre.findAll({
      include: Movie,
      where: {
        gen_title: gen1,
      },
      limit: 10,
    });

    const Genre2 = Genre.findAll({
      include: Movie,
      where: {
        gen_title: gen2,
      },
      limit: 10,
    });

    const Genre3 = Genre.findAll({
      include: Movie,
      where: {
        gen_title: gen3,
      },
      limit: 10,
    });

    const [movie, genre1, genre2, genre3] = await Promise.all([
      MovieData,
      Genre1,
      Genre2,
      Genre3,
    ]);

    const data = {
      movie: movie,
      genre1: genre1,
      genre2: genre2,
      genre3: genre3,
    };

    reply(successReplyMessage(data));
  } catch (error) {
    console.log(error);
    reply(catchReplyMessage());
  }
};

exports.getFullMovieDetails = async (request, reply) => {
  try {
    const movieGenre = Movie.findAll({
      include: Genre,
      where: {
        id: request.params.id,
      },
    });

    const movieDirection = Movie.findAll({
      include: Director,
      where: {
        id: request.params.id,
      },
    });

    const movieCast = Movie.findAll({
      include: Actor,
      where: {
        id: request.params.id,
      },
    });

    const [genre, director, cast] = await Promise.all([
      movieGenre,
      movieDirection,
      movieCast,
    ]);

    const data = {
      genre: genre,
      director: director,
      cast: cast,
    };

    reply(successReplyMessage(data));
  } catch (error) {
    reply(catchReplyMessage());
  }
};

exports.getMovieBySearchTerm = async (request, reply) => {
  try {
    const selectedOption = request.payload.selectedOption;
    let data = "";

    const { page, pageSize } = request.payload;
    const offset = page * pageSize;

    if (selectedOption === "Movie") {
      data = await Movie.findAll({
        where: {
          mov_title: {
            [Op.like]: `%${request.payload.searchTerm}%`,
          },
        },
        limit: pageSize,
        offset: offset,
      });
    } else if (selectedOption === "Director") {
      data = await Director.findAll({
        where: {
          dir_name: {
            [Op.like]: `%${request.payload.searchTerm}%`,
          },
        },
        limit: pageSize,
        offset: offset,
      });
    } else if (selectedOption === "Actor") {
      data = await Actor.findAll({
        where: {
          act_name: {
            [Op.like]: `%${request.payload.searchTerm}%`,
          },
        },
        limit: pageSize,
        offset: offset,
      });
    }

    reply(successReplyMessage(data));
  } catch (error) {
    console.log(error);
    reply(catchReplyMessage());
  }
};
