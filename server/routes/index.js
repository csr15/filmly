const { actorRoutes } = require("./actorRoutes");
const { directorRoutes } = require("./directorRoutes");
const { elasticRoutes } = require("./elasticRoutes");
const { genreRoutes } = require("./genreRoutes");
const { movieRoutes } = require("./movieRoutes");
const { userRoutes } = require("./userRoutes");

const routes = [
  ...movieRoutes,
  ...genreRoutes,
  ...directorRoutes,
  ...actorRoutes,
  ...userRoutes,
  ...elasticRoutes,
];

module.exports = routes;