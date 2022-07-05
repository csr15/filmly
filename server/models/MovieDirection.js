module.exports = (sequelize, DataTypes) => {
  const Movie_Direction = sequelize.define(
    "movie_direction",
    {},
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Movie_Direction;
};
