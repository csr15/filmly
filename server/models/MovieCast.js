module.exports = (sequelize, DataTypes) => {
  const Movie_Cast = sequelize.define(
    "movie_cast",
    {},
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Movie_Cast;
};
