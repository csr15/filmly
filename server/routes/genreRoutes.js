const { API_VERSION } = require("../constants/constants");
const {
  getAllGenre,
  getAllMoviesGenre,
  getAllMoviesOfSingleGenre,
  addGenre,
} = require("../controllers/genreController");

exports.genreRoutes = [
  {
    method: "GET",
    path: `${API_VERSION}/genre/all`,
    config: {
      cors: true,
    },
    handler: getAllGenre,
  },
  {
    method: "GET",
    path: `${API_VERSION}/genre/movie/all`,
    config: {
      cors: true,
    },
    handler: getAllMoviesGenre,
  },
  {
    method: "POST",
    path: `${API_VERSION}/genre/movie/{title}`,
    config: {
      cors: true,
    },
    handler: getAllMoviesOfSingleGenre,
  },
  {
    method: "POST",
    path: `${API_VERSION}/genre/add`,
    config: {
      cors: true,
    },
    handler: addGenre,
  },
];
