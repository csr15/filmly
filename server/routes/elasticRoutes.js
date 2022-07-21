const {
  elasticAddIndexHandler,
  elasticSearchIndexHandler,
} = require("../controllers/elasticController");

exports.elasticRoutes = [
  {
    method: "POST",
    path: "/api/v1/elastic/add",
    config: {
      handler: elasticAddIndexHandler,
    },
  },
  {
    method: "GET",
    path: "/api/v1/elastic/search/{userId}",
    config: {
      handler: elasticSearchIndexHandler,
    },
  },
];
