import express from "express";

import {addTask, getTasks, removeTask, updateTask} from "../controllers/tasks.js";

const tasksRouter = express.Router();

tasksRouter.route('/').get(getTasks).post(addTask);
tasksRouter.route('/:id').delete(removeTask).put(updateTask);

export default tasksRouter;