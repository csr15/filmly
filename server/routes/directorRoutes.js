const { API_VERSION } = require("../constants/constants");
const {
  getAllDirector,
  getAllMoviesOfDirector,
  getAllMoviesOfAllDirector,
  addDirector,
} = require("../controllers/directorController");

exports.directorRoutes = [
  {
    method: "POST",
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
    method: "POST",
    path: `${API_VERSION}/director/movie`,
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
