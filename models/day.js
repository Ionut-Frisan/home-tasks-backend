const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Task = require("./tasks");

class Day extends Model {}

Day.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    person: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "day",
  }
);

Task.Day = Task.belongsTo(Day);
Day.Tasks = Day.hasMany(Task, { onDelete: "CASCADE", as: "tasks" });

module.exports = Day;
