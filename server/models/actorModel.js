module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define(
    "actor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      act_name: {
        type: DataTypes.STRING,
      },
      act_gender: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Actor;
};
