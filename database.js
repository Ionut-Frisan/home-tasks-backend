const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('boae8u5hepvskq9rfz8e', 'uvj0oq4ixzj2js55mlip', '6r4vnnDfXWM62ZyQrcnq', {
  host: 'boae8u5hepvskq9rfz8e-postgresql.services.clever-cloud.com',
  dialect: 'postgres',
  logging: false,
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
