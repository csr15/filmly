const { API_VERSION } = require("../constants/constants");
const {
  getAllDirector,
  getAllMoviesOfDirector,
  getAllMoviesOfAllDirector,
  addDirector,
} = require("../controllers/directorController");
const { paginationValidator, paramIdValidator } = require("../validation");

exports.directorRoutes = [
  {
    method: "POST",
    path: `${API_VERSION}/director/all`,
    config: {
      cors: true,
      validate: paginationValidator
    },
    handler: getAllDirector,
  },
  {
    method: "GET",
    path: `${API_VERSION}/director/movie/all`,
    config: {
      cors: true,
    },
    handler: getAllMoviesOfAllDirector,
  },
  {
    method: "GET",
    path: `${API_VERSION}/director/movie/{id}`,
    config: {
      cors: true,
      validate: paramIdValidator
    },
    handler: getAllMoviesOfDirector,
  },
  {
    method: "POST",
    path: `${API_VERSION}/director/add`,
    config: {
      cors: true,
    },
    handler: addDirector,
  },
];
