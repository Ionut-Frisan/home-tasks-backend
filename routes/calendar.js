import express from "express";

import {
  addCommentToTask,
  addTaskToDay,
  changeTaskStatus,
  generateCalendar,
  getCalendar
} from "../controllers/calendar.js";

const calendarRouter = express.Router();

calendarRouter.route('/').post(generateCalendar).get(getCalendar);
calendarRouter.route('/tasks/updateStatus').put(changeTaskStatus);
calendarRouter.route('/tasks/addComment').put(addCommentToTask);
calendarRouter.route('/day/:dayId').post(addTaskToDay);


export default calendarRouter;