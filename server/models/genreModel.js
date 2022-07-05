module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "genre",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      gen_title: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Genre;
};
