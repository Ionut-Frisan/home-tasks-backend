const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db', 'user', 'pass', {
  dialect: "sqlite",
  host: './database.sqlite',
  logging: false
})

module.exports = sequelize;