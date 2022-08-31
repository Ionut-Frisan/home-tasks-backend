import {v4} from "uuid";
import asyncHandler from "../middleware/asyncHandler.js";
import db from "../db.js";


export const getTasks = asyncHandler(async (req, res, next) => {
  db.read();
  const data = db.data['tasks'];
  res.json(data);
})

export const addTask = asyncHandler(async (req, res, next) => {
  let newTask = req.body.task;
  newTask['id'] = v4();
  newTask['type'] = 'default';
  newTask['comments'] = [];

  db.data['tasks'].push({...newTask});
  db.write();
  res.json(db.data['tasks']);
})

export const removeTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  db.read();
  db.data['tasks'] = db.data['tasks'].filter((task) => task.id !== id);
  db.write();
  res.send('Removed successfully!')
})

export const updateTask = asyncHandler(async (req, res, next) => {
  db.read();

  const id = req.params.id;
  const taskToUpdate = {...req.body.task, id};

  db.data['tasks'] = db.data['tasks'].map((task) => {
    return task.id === taskToUpdate.id ? taskToUpdate : task
  });
  db.write();

  res.json(db.data['tasks']);
})