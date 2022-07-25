const { API_VERSION } = require("../constants/constants");
const {
  getAllMovie,
  getMovie,
  getMovieByLanguage,
  getMovieReleasedThisMonth,
  addNewMovie,
  getDataForHome,
  getFullMovieDetails,
  getMovieBySearchTerm,
} = require("../controllers/movieController");
const {
  paginationValidator,
  paramIdValidator,
  movieByLanguageValidator,
  homeDataValidator,
  searchValidator,
} = require("../validation");

exports.movieRoutes = [
  {
    method: "POST",
    path: `${API_VERSION}/movie/all`,
    config: {
      cors: true,
      validate: paginationValidator,
    },
    handler: getAllMovie,
  },
  {
    method: "GET",
    path: `${API_VERSION}/movie/{id}`,
    config: {
      cors: true,
      validate: paramIdValidator,
    },
    handler: getMovie,
  },
  {
    method: "POST",
    path: `${API_VERSION}/movie/search`,
    config: {
      cors: true,
      validate: searchValidator,
    },
    handler: getMovieBySearchTerm,
  },
  {
    method: "GET",
    path: `${API_VERSION}/movie/currentMonth`,
    config: {
      cors: true,
    },
    handler: getMovieReleasedThisMonth,
  },
  {
    method: "POST",
    path: `${API_VERSION}/movie/language`,
    config: {
      cors: true,
      validate: movieByLanguageValidator,
    },
    handler: getMovieByLanguage,
  },
  {
    method: "POST",
    path: `${API_VERSION}/movie/add`,
    config: {
      cors: true,
    },
    handler: addNewMovie,
  },
  {
    method: "POST",
    path: `${API_VERSION}/movie/home`,
    config: {
      cors: true,
      validate: homeDataValidator,
    },
    handler: getDataForHome,
  },
  {
    method: "GET",
    path: `${API_VERSION}/movie/details/{id}`,
    config: {
      cors: true,
      validate: paramIdValidator,
    },
    handler: getFullMovieDetails,
  },
];
