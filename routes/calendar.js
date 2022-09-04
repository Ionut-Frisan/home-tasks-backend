const express = require('express');

const {
  getDays,
  getDay,
  generateCalendar,
} = require('../controllers/calendar');

const calendarRouter = express.Router();

calendarRouter.route('/').post(generateCalendar).get(getDays);
// calendarRouter.route('/tasks/updateStatus').put(changeTaskStatus);
// calendarRouter.route('/tasks/addComment').put(addCommentToTask);
// calendarRouter.route('/day/:dayId').post(addTaskToDay);


module.exports = calendarRouter;