const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database')
const Task = require('./tasks');

class Day extends Model {}

Day.init({
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  person: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'day'
})

Day.Tasks = Day.hasMany(Task, {onDelete: 'CASCADE', as: 'tasks'});
Task.Day = Task.belongsTo(Day, {through: 'day_tasks'})

module.exports = Day;