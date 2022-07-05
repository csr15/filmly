const { API_VERSION } = require("../constants/constants");
const {
  getAllMovie,
  getMovie,
  getMovieByLanguage,
  getMovieReleasedThisMonth,
} = require("../controllers/movieController");

exports.movieRoutes = [
  {
    method: "GET",
    path: `${API_VERSION}/movie/all`,
    config: {
      handler: getAllMovie,
    },
  },
  {
    method: "GET",
    path: `${API_VERSION}/movie/{id}`,
    config: {
      handler: getMovie,
    },
  },
  {
    method: "GET",
    path: `${API_VERSION}/movie/currentMonth`,
    config: {
      handler: getMovieReleasedThisMonth,
    },
  },
  {
    method: "GET",
    path: `${API_VERSION}/movie/language/{name}`,
    config: {
      handler: getMovieByLanguage,
    },
  }
];
