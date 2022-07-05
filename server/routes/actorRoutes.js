const { API_VERSION } = require("../constants/constants");
const {
  getAllActor,
  getAllMoviesofAllActor,
  getActorMovieCount,
} = require("../controllers/actorController");

exports.actorRoutes = [
  {
    method: "GET",
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
    path: `${API_VERSION}/actor/movie/count`,
    config: {
      handler: getActorMovieCount,
    },
  },
];
