const express = require('express');
const { addTask, getTasks, removeTask, getTask, updateTask } = require('../controllers/tasks')

const tasksRouter = express.Router();

tasksRouter.route('/').get(getTasks).post(addTask);
tasksRouter.route('/:id').delete(removeTask).get(getTask).put(updateTask);

module.exports = tasksRouter;