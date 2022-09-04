const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database')

class Comment extends Model {}

Comment.init({
  value: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'comment'
})

module.exports = Comment;