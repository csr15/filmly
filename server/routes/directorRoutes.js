const { API_VERSION } = require("../constants/constants");
const {
  getAllDirector,
  getAllMoviesOfDirector,
  getAllMoviesOfAllDirector,
} = require("../controllers/directorController");

exports.directorRoutes = [
  {
    method: "GET",
    path: `${API_VERSION}/director/all`,
    config: {
      handler: getAllDirector,
    },
  },
  {
    method: "GET",
    path: `${API_VERSION}/director/movie/all`,
    config: {
      handler: getAllMoviesOfAllDirector,
    },
  },
  {
    method: "GET",
    path: `${API_VERSION}/director/movie/{id}`,
    config: {
      handler: getAllMoviesOfDirector,
    },
  },
];
