import {v4} from "uuid";
import asyncHandler from "../middleware/asyncHandler.js";
import db from "../db.js";

export const getCalendar = asyncHandler(async (req, res, next) => {
  db.read();
  const data = db.data['calendar'];
  res.json(data);
})

export const generateCalendar = asyncHandler(async (req, res, next) => {
  db.read();

  const persons = req.body.persons;
  const interval = req.body.interval || 3;
  const period = req.body.period || 90;
  let tasks = db.data['tasks'];
  const date = req.body.startDate;
  const startDate = new Date(date.year, date.month, date.day + 1) || new Date();
  startDate?.setDate(startDate.getDate() - interval);

  const count = Math.floor(period/interval);
  let calendar = [];

  tasks = tasks.map((task) => {
    return {...task, status: 'not started', created: new Date(), updated: new Date()}
  })

  for(let i= count; i>0; i--){
    let intervalMultiplier = findClosestMultiplier(i, 3);
   calendar.push({date : new Date(startDate.setDate(startDate.getDate() + interval)), person: persons[intervalMultiplier - i], id: v4(), tasks})
  }

  db.data['calendar'] = calendar;

  db.write();

  res.json(db.data['calendar']);
})

export const changeTaskStatus = asyncHandler(async (req, res, next) => {
  db.read();
  const taskId = req.body.taskId;
  const dayId = req.body.dayId;
  const status = req.body.status;

  const data = db.data['calendar'];
  const dayToModify = data.filter((day) => {
    return day.id === dayId
  })

  if(dayToModify[0]?.tasks){
    dayToModify[0].tasks = dayToModify[0].tasks.map((task) => {
      if( task.id === taskId){
        task.status = status;
      }
      return task;
    })
    db.write();
    res.json(db.data['calendar']);
  }
  else res.status(400).send('not found')
})

export const addCommentToTask = asyncHandler(async (req, res, next) => {
  db.read();
  const taskId = req.body.taskId;
  const dayId = req.body.dayId;
  const comment = req.body.comment;

  const data = db.data['calendar'];
  const dayToModify = data.filter((day) => {
    return day.id === dayId
  })

  if(dayToModify[0]?.tasks){
    dayToModify[0].tasks = dayToModify[0].tasks.map((task) => {
      if( task.id === taskId){
        task.comments = [...task.comments, comment];
      }
      return task;
    })
    db.write();
    res.json(db.data['calendar']);
  }
  else res.status(400).send('not found')


})

const findClosestMultiplier = (index, interval) => {
  let i = 1;
  while(i*interval < index){
    i += 1;
  }
  return i*interval;
}