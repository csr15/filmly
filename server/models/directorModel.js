module.exports = (sequelize, DataTypes) => {
  const Director = sequelize.define(
    "director",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      dir_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Director;
};
