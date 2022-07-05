module.exports = (sequelize, DataTypes) => {
  const Movie_Genre = sequelize.define(
    "movie_genre",
    {},
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Movie_Genre;
};
