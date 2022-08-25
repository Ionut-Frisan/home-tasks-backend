import express from 'express'
import db from './db.js'
import bodyParser from "body-parser";
import tasksRouter from './routes/tasks.js';
import calendarRouter from './routes/calendar.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', tasksRouter);
app.use('/calendar', calendarRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Started express server');
})