module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "movie",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      mov_title: {
        type: DataTypes.STRING,
      },
      mov_year: {
        type: DataTypes.DATE,
      },
      mov_lang: {
        type: DataTypes.STRING,
      },
      mov_region: {
        type: DataTypes.STRING,
      },
      mov_time: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Movie;
};
