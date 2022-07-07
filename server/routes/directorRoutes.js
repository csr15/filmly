const { API_VERSION } = require("../constants/constants");
const {
  getAllDirector,
  getAllMoviesOfDirector,
  getAllMoviesOfAllDirector,
  addDirector,
} = require("../controllers/directorController");

exports.directorRoutes = [
  {
    method: "GET",
    path: `${API_VERSION}/director/all/{page}`,
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
  {
    method: "POST",
    path: `${API_VERSION}/director/add`,
    config: {
      handler: addDirector,
    },
  },
];
