const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const tasksRouter = require("./routes/tasks");
const calendarRouter = require("./routes/calendar");
const commentsRouter = require("./routes/comment");

sequelize.sync().then(() => console.log("db is ready"));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.options('*', cors());

app.use("/tasks", tasksRouter);
app.use("/calendar", calendarRouter);
app.use("/comments", commentsRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Started express server on port: ${PORT}`);
});
