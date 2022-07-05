const Hapi = require("hapi");

// Routes
const { actorRoutes } = require("./routes/actorRoutes");
const { directorRoutes } = require("./routes/directorRoutes");
const { genreRoutes } = require("./routes/genreRoutes");
const { movieRoutes } = require("./routes/movieRoutes");

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

server.start((err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server is listening in ${server.info.uri}`);
});

process.on("unhandledRejection", (err) => {
  if (err) {
    console.log(err);
  }
});
