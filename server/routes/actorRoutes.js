const { API_VERSION } = require("../constants/constants");
const {
  getAllActor,
  getAllMoviesofAllActor,
  getActorMovieCount,
  addActor,
} = require("../controllers/actorController");

exports.actorRoutes = [
  {
    method: "GET",
    path: `${API_VERSION}/actor/all/{page}`,
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
    path: `${API_VERSION}/actor/movie/count`,
    config: {
      handler: getActorMovieCount,
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
