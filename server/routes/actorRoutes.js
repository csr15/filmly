const { API_VERSION } = require("../constants/constants");
const {
  getAllActor,
  getAllMoviesofAllActor,
  addActor,
  getActorMovieCountByThisYear,
} = require("../controllers/actorController");

exports.actorRoutes = [
  {
    method: "POST",
    path: `${API_VERSION}/actor/all`,
    config: {
      handler: getAllActor,
    },
  },
  {
    method: "GET",
    path: `${API_VERSION}/actor/movie/all`,
    config: {
      handler: getAllMoviesofAllActor,
    },
  },
  {
    method: "GET",
    path: `${API_VERSION}/actor/movie/count/{id}`,
    config: {
      handler: getActorMovieCountByThisYear,
    },
  },
  {
    method: "POST",
    path: `${API_VERSION}/actor/add`,
    config: {
      handler: addActor,
    },
  },
];
