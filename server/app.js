const Hapi = require("hapi");

const logger = require("./logger");
const elasticClient = require("./elasticSearch/index");
const { rateLimiter } = require("./helpers/helper");
const routes = require("./routes");

//Initialize Elastic Search
elasticClient
  .info()
  .then((response) => console.log("Elastic search connected successfully!"))
  .catch((error) => console.error(error));

// Environment Initialization
require("dotenv").config({ path: "./config/.env" });

//Creating Hapi Server
const server = new Hapi.Server();
server.connection({
  host: process.env.LOCAL_HOST,
  port: process.env.PORT,
});

//Routes
server.route(routes);

//Rate limiter
server.ext("onRequest", async (request, reply) => {
  rateLimiter(request, reply);
});

server.ext("onRequest", async (request, reply) => {
  logger.log("info", `Request to: ${request.url.pathname}`);
  reply.continue();
});

server.start((err) => {
  if (err) {
    logger.log("error", "Problem on creating server");
  }

  logger.log("info", "Server created successfully");
  console.log(`Server is listening in ${server.info.uri}`);
});

process.on("unhandledRejection", (err) => {
  if (err) {
    logger.log("error", "Un handled rejection", err);
  }
});
