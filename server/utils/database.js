const Sequelize = require('sequelize');

const sequelize = new Sequelize("filmly", 'postgres', 'shadow@15', {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;