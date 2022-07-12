const { API_VERSION } = require("../constants/constants");
const { getAllGenre, getAllMoviesGenre, getAllMoviesOfSingleGenre, addGenre } = require("../controllers/genreController");

exports.genreRoutes = [
  {
    method: "POST",
    path: `${API_VERSION}/genre/all`,
    handler: getAllGenre,
  },
  {
    method: "GET",
    path: `${API_VERSION}/genre/movie/all`,
    handler: getAllMoviesGenre,
  },
  {
    method: "GET",
    path: `${API_VERSION}/genre/movie/{id}`,
    handler: getAllMoviesOfSingleGenre,
  },
  {
    method: "POST",
    path: `${API_VERSION}/genre/add`,
    handler: addGenre,
  },
];
