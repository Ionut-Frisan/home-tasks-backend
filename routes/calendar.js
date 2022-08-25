import express from "express";

import {addCommentToTask, changeTaskStatus, generateCalendar, getCalendar} from "../controllers/calendar.js";

const calendarRouter = express.Router();

calendarRouter.route('/').post(generateCalendar).get(getCalendar);
calendarRouter.route('/tasks/updateStatus').put(changeTaskStatus);
calendarRouter.route('/tasks/addComment').put(addCommentToTask);


export default calendarRouter;