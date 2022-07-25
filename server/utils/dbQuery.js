const db = require("../models");

const Movie = db.movie;
const Genre = db.genre;
const Actor = db.actor;
const Director = db.director;
const User = db.users;

exports.MovieFindAll = async (props) => {
  const data = await Movie.findAll(props);

  return data;
};

exports.MovieCreate = async (props) => {
  const data = await Movie.create(props);

  return data;
};

exports.GenreFindAll = async (props) => {
  const data = await Genre.findAll(props);

  return data;
};

exports.GenreCreate = async (props) => {
  const data = await Genre.create(props);

  return data;
};

exports.ActorFindAll = async (props) => {
  const data = await Actor.findAll(props);

  return data;
};

exports.ActorCount = async (props) => {
  const data = await Actor.count(props);

  return data;
};

exports.ActorCreate = async (props) => {
  const data = await Actor.create(props);

  return data;
};

exports.DirectorFindAll = async (props) => {
  const data = await Director.findAll(props);

  return data;
};

exports.DirectorCreate = async (props) => {
  const data = await Director.create(props);

  return data;
};

exports.UserFindOne = async (props) => {
  const data = await User.findOne(props);

  return data;
};

exports.UserCreate = async (props) => {
  const data = await User.create(props);
  
  return data;
};
