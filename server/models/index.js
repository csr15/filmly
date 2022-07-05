const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require("./movieModel.js")(sequelize, DataTypes);
db.director = require("./directorModel")(sequelize, DataTypes);
db.actor = require("./actorModel")(sequelize, DataTypes);
db.genre = require("./genreModel")(sequelize, DataTypes);
db.movieCast = require("./MovieCast")(sequelize, DataTypes);
db.movieDirection = require("./MovieDirection")(sequelize, DataTypes);
db.movieGenre = require("./MovieGenre")(sequelize, DataTypes);

// Creating association between actor and movies as Movie Cast
db.actor.belongsToMany(db.movie, { through: db.movieCast }); //movId, actId //
db.movie.belongsToMany(db.actor, { through: db.movieCast });

// Creating association between director and movies as Movie Direction
db.director.belongsToMany(db.movie, { through: db.movieDirection });
db.movie.belongsToMany(db.director, { through: db.movieDirection });

// Creating association between genre and movies as Movie Genre
db.genre.belongsToMany(db.movie, { through: db.movieGenre });
db.movie.belongsToMany(db.genre, { through: db.movieGenre });

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
