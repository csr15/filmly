const { API_VERSION } = require("../constants/constants");
const {
  getAllActor,
  getAllMoviesofAllActor,
  addActor,
  getActorMovieCountByThisYear,
  getAllMoviesofActor,
} = require("../controllers/actorController");

exports.actorRoutes = [
  {
    method: "POST",
    path: `${API_VERSION}/actor/all`,
    config: {
      cors: true,
    },
    handler: getAllActor,
  },
  {
    method: "GET",
    path: `${API_VERSION}/actor/movie/all`,
    config: {
      cors: true,
    },
    handler: getAllMoviesofAllActor,
  },
  {
    method: "GET",
    path: `${API_VERSION}/actor/movie/count/{id}`,
    config: {
      cors: true,
    },
    handler: getActorMovieCountByThisYear,
  },
  {
    method: "POST",
    path: `${API_VERSION}/actor/add`,
    config: {
      cors: true,
    },
    handler: addActor,
  },
  {
    method: "POST",
    path: `${API_VERSION}/actor/movie/{id}`,
    config: {
      cors: true,
    },
    handler: getAllMoviesofActor,
  },
];
