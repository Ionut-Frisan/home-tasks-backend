const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgresql://uvj0oq4ixzj2js55mlip:6r4vnnDfXWM62ZyQrcnq@boae8u5hepvskq9rfz8e-postgresql.services.clever-cloud.com:5432/boae8u5hepvskq9rfz8e"
);
module.exports = sequelize;
