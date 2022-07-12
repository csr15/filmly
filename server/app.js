const Hapi = require("hapi");
const logger = require("./logger");
const jwt = require("jsonwebtoken");

// Routes
const { actorRoutes } = require("./routes/actorRoutes");
const { directorRoutes } = require("./routes/directorRoutes");
const { genreRoutes } = require("./routes/genreRoutes");
const { movieRoutes } = require("./routes/movieRoutes");
const { userRoutes } = require("./routes/userRoutes");
const { catchReplyMessage, accessTokenExpired } = require("./helpers/helper");
const { FORBIDDEN, SUCCESS } = require("./constants/constants");

// Environment Initialization
require("dotenv").config({ path: "./config/.env" });

const server = new Hapi.Server();

server.connection({
  host: process.env.LOCAL_HOST,
  port: process.env.PORT,
});

server.route(movieRoutes);
server.route(genreRoutes);
server.route(directorRoutes);
server.route(actorRoutes);
server.route(userRoutes);

server.ext("onRequest", (request, reply) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (request.url.pathname !== "/api/v1/login") {
    if (token !== undefined) {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
          reply(accessTokenExpired()).code(FORBIDDEN);

          logger.log("error", "Access token expired", err);
        } else {
          if (user === null) {
            logger.log("error", "Access token expired");
            return reply(accessTokenExpired()).code(FORBIDDEN);
          } else {
            logger.log("info", "Request granted");
            return reply.continue().code(SUCCESS);
          }
        }
      });
    } else {
      reply(catchReplyMessage("Please provide access token"));
    }
  } else {
    reply.continue();
  }
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
