const Task = require("../models/tasks");
const Comment = require("../models/comment");
const asyncHandler = require("../middleware/asyncHandler");

Comment.Task = Comment.belongsTo(Task);

exports.getTasks = asyncHandler(async (req, res, next) => {
  Task.findAll({ where: { displayInFE: true }, include: Task.Comments })
    .then((tasks) => res.send(tasks))
    .catch((err) => res.send([]));
});

exports.getTask = asyncHandler(async (req, res, next) => {
  const requestedId = req.params.id;
  Task.findOne({ where: { id: requestedId } })
    .then((task) => res.send(task))
    .catch(() => res.status(400).send("No task with given id"));
});

exports.addTask = asyncHandler(async (req, res, next) => {
  Task.create(req.body, { include: Task.Day });

  const tasks =
    (await Task.findAll({
      where: { displayInFE: true },
      include: Task.Comments,
    })) || [];
  res.send(tasks);
});

exports.removeTask = asyncHandler(async (req, res, next) => {
  const requestedId = req.params.id;
  Task.destroy({ where: { id: requestedId } })
    .then(() => res.send("Task was removed"))
    .catch((err) => res.status(400).send());
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  const requestedId = req.params.id;
  let values = {};
  if (req.body.name) values.name = req.body.name;
  if (req.body.status) values.status = req.body.status;
  console.log(values);
  await Task.update({ ...values }, { where: { id: requestedId } });

  res.send();
});

exports.addComment = asyncHandler(async (req, res, next) => {
  const taskId = req.body.taskId;
  const value = req.body.comment;
  const comment = await Comment.create({ value, taskId });
  res.send(comment);
});
