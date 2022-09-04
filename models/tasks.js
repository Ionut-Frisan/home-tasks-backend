const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database')
const Comment = require('./comment');

class Task extends Model {
}

Task.init({
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'default'
  },
  status: {
    type: DataTypes.ENUM('not_started', 'canceled', 'done'),
    defaultValue: 'not_started',
  },
  displayInFE: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  sequelize,
  modelName: 'task',
})

Task.Comments = Task.hasMany(Comment);

module.exports = Task;